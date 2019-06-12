<template>
  <ViewContainer :loading="!loaded" :paddingConfig="{def: '0'}">
    <FlexCol height="100%">
      <FlexRow alignItems="center" padding="0 20">
        <ProductBasics flexGrow="3" v-if="product" :product="product"/>
        <StackLayout flexGrow="1">
          <FlexRow width="80%">
            <StateButton inactive @onTap="gotoSellerProfile" text="P"/>
            <Split/>
            <StateButton @onTap="gotoCheckout" text="Buy"/>
          </FlexRow>
        </StackLayout>
      </FlexRow>
      <Split big/>
      <StackLayout padding="0 20">
        <StackLayout v-for="message in messages" :key="message.id" margin="5">
          <ChatMessage :message="message" fromMe/>
        </StackLayout>
      </StackLayout>
      <Split fill/>
      <Chatbox/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ChatMessage from '@/components/blocks/conversation/ChatMessage'
import Chatbox from '@/components/blocks/conversation/Chatbox'
import ProductBasics from '@/components/blocks/product/ProductBasics'
import Api from '@/services/api'
import EventBus from '@/services/event-bus'

const SocketIO = require('nativescript-socket.io')

export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  created() {
    this.getConversation()
      .then(() => this.getProduct())
      .then(() => {
        this.socketio = SocketIO.connect('http://18.188.233.81')

        this.socketio.on('connect', () => {
          this.socketio.emit('joinConv', `conv${this.conversation.id}`)
          this.socketio.on('msgReceived', (msg) => {
            this.messages.push(msg)
          })
        })

        this.loaded = true
      })
  },
  data: () => ({
    conversation: null,
    product: null,
    socketio: null,
    loaded: false
  }),
  computed: {
    messages() {
      if (!this.conversation) return []
      return this.conversation.messages
    }
  },
  methods: {
    getConversation() {
      return Api.getConversation(this.productId)
        .then((conversation) => {
          this.conversation = conversation
          return conversation
        })
    },
    getProduct() {
      return Api.getProduct(this.conversation.proId)
        .then((product) => {
          this.product = product
          return product
        })
    },
    gotoSellerProfile() {
      EventBus.$emit('navigateTo', 'Profile', { userId: this.product.selId })
    },
    gotoCheckout() {
      EventBus.$emit('navigateTo', 'Checkout', { productId: this.productId })
    }
  },
  components: {
    ChatMessage,
    Chatbox,
    ProductBasics
  }
}
</script>