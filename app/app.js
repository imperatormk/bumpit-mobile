import Vue from 'nativescript-vue'
import firebase from 'nativescript-plugin-firebase'
import config from '@/shared/firebase-config'

import ViewContainer from '@/components/containers/ViewContainer'
import StateButton from '@/components/common/StateButton'
import Navigation from '@/components/common/Navigation'
Vue.component('ViewContainer', ViewContainer)
Vue.component('StateButton', StateButton)
Vue.component('Navigation', Navigation)

Vue.registerElement('CreditCardView', () => require('nativescript-stripe').CreditCardView)

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel)
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem)

Vue.registerElement('StarRating', () => require('nativescript-star-ratings').StarRating)

Vue.config.silent = true

import Master from '@/components/containers/Master'
import ItemFeed from '@/components/views/ItemFeed'

import store from '@/store'

new Vue({
  render: h => h(Master, [h(ItemFeed)]),
  created() {
    firebase.init(config)
      .then(() => {})
      .catch(err => console.error(err))
  },
  store
}).$start()