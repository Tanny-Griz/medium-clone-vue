<template>
  <div id="app">
    <McvTopbar />
    <router-view />
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'McvApp',
  components: {
    McvTopbar
  },
  mounted() {
    // диспатчим акшин
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
