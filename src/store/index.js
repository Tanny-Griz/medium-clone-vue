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
    // article f47aae4e-797e-4c82-b058-b604646da633

  }
})
 