import Vue from 'vue'
import Vuex from 'vuex'
//импорт аутентиф
import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import tags from '@/store/modules/tags'
// import article from '@/store/modules/article'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
  },
  modules: {
    auth,
    feed,
    tags,
    // article
  }
})
 