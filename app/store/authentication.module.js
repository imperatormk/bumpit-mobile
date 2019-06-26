import decodeJwt from 'jwt-decode'
import auth from '@/services/auth'

const jwt = auth.getJwt(true)
const user = jwt ? decodeJwt(jwt) : null

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

export default {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, { username, password }) {
      return auth.login(username, password)
        .then((userObj) => {
          commit('loginSuccess', userObj)
          return userObj
        })
        .catch((err) => {
          commit('loginFailure')
          const { data } = err.response
          return Promise.reject(data)
        })
    },
    logout({ commit }) {
      auth.logout()
      commit('logout')
    }
  },
  mutations: {
    loginSuccess(state, userObj) {
      state.status = { loggedIn: true }
      state.user = userObj
    },
    loginFailure(state) {
      state.status = {}
      state.user = null
    },
    logout(state) {
      state.status = {}
      state.user = null
    }
  }
}
