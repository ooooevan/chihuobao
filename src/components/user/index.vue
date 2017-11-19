<template>
  <div>
    <user-header :home='home' logo="https://www.baidu.com/img/baidu_jgylogo3.gif" :profile='{}'></user-header>
    <router-view />
  </div>
</template>

<script>
import userHeader from 'baseComponents/userHeader'

export default {
  components: {
    userHeader
  },
  computed: {
    home () {
      return this.$route.path === '/home'
    }
  }
}
</script>

<style scoped>
</style>
