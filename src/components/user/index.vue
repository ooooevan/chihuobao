<template>
  <div id='app'>
    <user-header :home='home' logo="https://www.baidu.com/img/baidu_jgylogo3.gif" :profile='{}'></user-header>
    <router-view />
    <user-footer></user-footer>
  </div>
</template>

<script>
import userHeader from 'baseComponents/userHeader'
import userFooter from 'baseComponents/userFooter'

export default {
  components: {
    userHeader,
    userFooter
  },
  computed: {
    home () {
      return this.$route.path === '/home' /* || this.$route.path === '/register' */
    }
  }
}
</script>

<style scoped lang='sass'>
  #app
    height: 100%
    width: 100%
</style>
