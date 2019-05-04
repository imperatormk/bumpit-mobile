import Vue from 'nativescript-vue'
import firebase from 'nativescript-plugin-firebase'
import config from '@/shared/firebase-config'

import ViewContainer from '@/components/containers/ViewContainer'
Vue.component('ViewContainer', ViewContainer)

Vue.config.silent = true

import HomeScreen from '@/components/views/HomeScreen'

import store from '@/store'

new Vue({
  render: h => h('frame', [h(HomeScreen)]),
  created() {
    firebase.init(config)
      .then(() => {})
      .catch(err => console.error(err))
  },
  store
}).$start()