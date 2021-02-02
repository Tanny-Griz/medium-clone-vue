<template>
  <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
          <li class="nav-item" v-if="isLoggedIn">
              <router-link 
                class="nav-link" 
                :class="{active: routeName === 'yourFeed'}" 
                :to="{name: 'yourFeed'}">
                  Your Feed
              </router-link>
          </li>

          <li class="nav-item">
              <router-link 
                class="nav-link"
                :class="{active: routeName === 'globalFeed'}" 
                :to="{name: 'globalFeed'}">
                  Global Feed
              </router-link>
          </li>

          <li class="nav-item" v-if="tagName">
              <router-link 
                class="nav-link"
                :class="{active: routeName === 'tag'}" 
                :to="{name: 'tag'}">
                  <i class="ion-pound"></i>
                  {{tagName}}
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'

export default {
    name: 'McvFeedToggler',
    props: {
        tagName: {
            type: String,
            required: false
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: getterTypes.isLoggedIn
        }),
        routeName() {
            return this.$route.name
        }
    }
}
</script>