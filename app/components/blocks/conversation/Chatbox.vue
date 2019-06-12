<template>
  <FlexboxLayout flexDirection="row">
    <TextField hint="Enter your message..." 
      v-model="message" 
      :editable="!sending"
      secure="false"
      returnKeyType="done"
      fontSize="15"
      autocorrect="false"
      style="margin:0px;border-width:3px;border-right-width:0px;border-color:#e5e5e5"
      class="input input-border"
      flexGrow="9"/>
    <Button flexGrow="1" @tap="sendMessage" :isEnabled="!sending" style="border-width: 1;border-color:#e5e5e5;margin:0px;color:#8c8c8c;" class="fas" fontSize="20" :text="commenting ? '\uf110' : '\uf1d8'"/>
  </FlexboxLayout>
</template>

<script>
export default {
  props: {
    sending: Boolean
  },
  data: () => ({
    message: ''
  }),
  methods: {
    sendMessage() {
      const trimmedMessage = this.message.trim()
      if (!trimmedMessage) return
      this.$emit('sendMessage', trimmedMessage)
    }
  }
}
</script>