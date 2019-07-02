<template>
  <ViewContainer :loading="!loaded" :paddingConfig="{def: '0'}">
    <TabView :selectedIndex="selectedType">
      <TabViewItem :title="followers.length + ' followers'">
        <StackLayout padding="10">
          <ScrollView orientation="vertical" v-if="followers.length">
            <UserConnection @connectionChanged="onConnectionChanged" padding="5" v-for="follower in followers" :key="follower.user.id" :connection="follower"/>
          </ScrollView>
          <Label v-else padding="5" text="Nothing to see at the moment..." fontSize="18"/>
        </StackLayout>
      </TabViewItem>
      <TabViewItem :title="followees.length + ' following'">
        <StackLayout padding="10">
          <ScrollView orientation="vertical" v-if="followees.length">
            <UserConnection @connectionChanged="onConnectionChanged" padding="5" v-for="followee in followees" :key="followee.user.id" :connection="followee"/>
          </ScrollView>
          <Label v-else padding="5" text="Nothing to see at the moment..." fontSize="18"/>
        </StackLayout>
      </TabViewItem>
    </TabView>
  </ViewContainer>
</template>

<script>
import UserConnection from '@/components/blocks/social/UserConnection'
import Api from '@/services/api'
import Auth from '@/services/auth'

export default {
  props: {
    userId: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: 'followers'
    }
  },
  mounted() {
    this.fetchData()
  },
  data: () => ({
    followers: [],
    followees: [],
    selectedType: 0,
    loaded: false
  }),
  methods: {
    fetchData() {
      return Api.getConnections(this.userId)
        .then((connections) => {
          this.followers = []
          this.followees = []

          this.$nextTick(() => {
            const followers = connections.filter(connection => connection.type === 'follower')
            const followees = connections.filter(connection => connection.type === 'followee')

            this.followers = followers
            this.followees = followees
            this.loaded = true
            this.adjustType()
          })
        })
    },
    adjustType() {
      if (this.type === 'followers') {
        this.selectedType = 0
      } else if (this.type === 'followees') {
        this.selectedType = 1
      }
    },
    onConnectionChanged() {
      this.fetchData()
    }
  },
  components: {
    UserConnection
  }
}
</script>