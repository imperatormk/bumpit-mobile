<template>
  <StackLayout>
    <UserBasics v-if="user" :user="user">
      <FlexCol>
        <LabelButton :text="`@${user.username}`"/>
        <Label marginTop="3" fontSize="12" v-if="followsMe" text="Follows you"/>
      </FlexCol>
      <FlexCol slot="actions" justifyContent="space-around">
        <StackLayout v-if="isLoggedIn">
          <StateButton @onTap="executeNextAction" :text="getNextAction" />
        </StackLayout>
      </FlexCol>
    </UserBasics>
    <Label v-else text="No user object!"/>
  </StackLayout>
</template>

<script>
import UserBasics from '@/components/blocks/user/UserBasics'
import EventBus from '@/services/event-bus'

export default {
  props: {
    connection: {
      type: Object,
      required: true
    }
  },
  created() {
    this.connectionObj = JSON.parse(JSON.stringify(this.connection))
  },
  data: () => ({
    connectionObj: {}
  }),
  computed: {
    user() {
      return this.connectionObj.user
    },
    followsMe() {
      return this.connectionObj.type === 'followee' && this.connectionObj.followsMe
    },
    followedByMe() {
      return this.connectionObj.type === 'follower' && this.connectionObj.followedByMe
    },
    getNextAction() {
      if (this.connectionObj.type === 'followee' || this.followedByMe) return 'unfollow'
      return 'follow'
    }
  },
  methods: {
    executeNextAction() {
      const nextAction = this.getNextAction
      console.log(nextAction)
      // TODO: implement this!
    }
  },
  components: {
    UserBasics
  }
}
</script>
