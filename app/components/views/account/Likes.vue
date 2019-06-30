<template>
  <ViewContainer :loading="!loaded" :paddingConfig="{scr: '20 10'}">
    <FlexCol v-if="likes.length > 0" height="100%" slot="scrollable">
      <FlexCol alignItems="center">
        <ProductLike v-for="like in likes" :key="like.id" :productLike="like"/>
      </FlexCol>

      <StackLayout v-if="hasMore">
        <Split big/>
        <StateButton text="Load more" @onTap="loadMoreProducts" block/>
      </StackLayout>
    </FlexCol>

    <FlexCol v-else height="100%" justifyContent="center" alignItems="center">
      <Label text="Nothing to see at the moment..." fontSize="18"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductLike from '@/components/blocks/social/ProductLike'
import Api from '@/services/api'
import Auth from '@/services/auth'

export default {
  mounted() {
    this.pagination = { ...this.defaultPagination }

    this.getAuthUser()
      .then((user) => {
        this.userId = user.id
        return this.loadMoreLikes(true)
      })
      .finally(() => {
        this.loaded = true
      })
  },
  computed: {
    hasMore() {
      return this.totalLikes > this.likes.length
    }
  },
  data: () => ({
    userId: null,
    pagination: {},
    likes: [],
    defaultPagination: {
      page: 1,
      size: 6
    },
    totalLikes: 0,
    loaded: false
  }),
  methods: {
    getAuthUser() {
      return Auth.getAuthUser()
    },
    loadMoreLikes(first) {
      if (!this.hasMore && !first) return Promise.resolve()

      return Api.getLikesToUser(this.userId, this.pagination)
        .then((result) => {
          this.likes.push(...result.content)
          this.totalLikes = result.totalElements
          this.pagination.page += 1
        })
    }
  },
  components: {
    ProductLike
  }
}
</script>