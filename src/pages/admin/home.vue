<template>
  <div class="div">请登录
    <admin-login @close='close' :visible='loginVisible'></admin-login>
  </div>
</template>
<script>
  import adminLogin from './adminLogin'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      adminLogin
    },
    data () {
      return {
        loginVisible: true
      }
    },
    computed: {
      ...mapGetters('admin',
        [
          'adminInfo'
        ]
      )
    },
    beforeRouteEnter: (to, from, next) => {
      if (this.adminInfo && this.adminInfo.adminName) {
        this.loginVisible = false
        this.$router.push('/admin/shops')
      } else {
        next()
      }
    },
    methods: {
      close () {
        // this.loginVisible = false
      }
    }
  }
</script>
<style>

</style>
