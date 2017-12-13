<template>
  <div id='app'>
    <user-header :home='home' @kaidian='kaidian' @logOut='_logOut' logo="https://www.baidu.com/img/baidu_jgylogo3.gif" :userInfo='userInfo'></user-header>
    <div class="main">页面已经被吃掉了...</div>
    <user-footer></user-footer>
  </div>
</template>

<script>
import userHeader from 'components/userHeader'
import userFooter from 'components/userFooter'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    userHeader,
    userFooter
  },
  methods: {
    ...mapActions(
      'user',
      [
        'logOut'
      ]
      ),
    ...mapMutations({
      noteKaidian: 'user/NOTE_KAIDIAN',
      clearKaidianNote: 'user/CLEAR_KAIDIAN_NOTE'
    }),
    kaidian () {
      if (!this.userInfo.name) {
        this.$message({
          showClose: true,
          message: '开店请先登录'
        })
        this.noteKaidian()
        this.$router.push('/login')
      } else {
        this.$confirm('是否马上申请开店?', '提示', {
          confirmButtonText: '申请',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$router.push('/applyShop')
        }).catch(() => {
          this.normalLogin()
        })
        this.clearKaidianNote()
      }
    },
    _logOut () {
      this.logOut()
      this.$message({
        showClose: true,
        message: '已退出'
      })
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(
      'user',
      [
        'userInfo'
      ]
    ),
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
    // background: url('../../common/images/2.jpg')
    .main
      min-height: 550px
      text-align: center
      padding-top: 250px
    
</style>
