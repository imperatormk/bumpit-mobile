<template>
  <ViewContainer :loading="!loaded" :paddingConfig="{def: '0'}">
    <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
      <TabViewItem :title="followers.length + ' followers'">
        <StackLayout padding="10">
          <ScrollView orientation="vertical">
            <UserConnection @connectionChanged="onConnectionChanged" padding="5" v-for="follower in followers" :key="follower.user.id" :connection="follower"/>
          </ScrollView>
        </StackLayout>
      </TabViewItem>
      <TabViewItem :title="followees.length + ' following'">
        <StackLayout padding="10">
          <ScrollView orientation="vertical">
            <UserConnection @connectionChanged="onConnectionChanged" padding="5" v-for="followee in followees" :key="followee.user.id" :connection="followee"/>
          </ScrollView>
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
          })
        })
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