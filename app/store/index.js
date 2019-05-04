import Vue from 'nativescript-vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      user: {}
    },
    mutations: {
      setUser(state, user) {
        state.user = user
      }
    },
    getters: {
      getCurrentUser: state => {
        return state.user
      },
      hasLoggedInUser: state => {
        return !!state.user && !!state.user.uid
      }
    }
})

export default store