<template>
  <div id='app'>
    <user-header :home='home' @kaidian='kaidian' @logOut='_logOut' logo="https://www.baidu.com/img/baidu_jgylogo3.gif" :userInfo='userInfo'></user-header>
    <router-view />
    <user-footer class='footer'></user-footer>
  </div>
</template>

<script>
import userHeader from 'components/userHeader'
import userFooter from 'components/userFooter'
import { _getShopType } from 'common/javascript/userApi'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    userHeader,
    userFooter
  },
  created () {
    this.getShopType()
  },
  methods: {
    ...mapActions(
      'user',
      [
        'logOut',
        'setShopType'
      ]
      ),
    ...mapMutations({
      noteKaidian: 'user/NOTE_KAIDIAN',
      clearKaidianNote: 'user/CLEAR_KAIDIAN_NOTE',
      setReLogin: 'user/SET_RE_LOGIN'
    }),
    getShopType () {
      _getShopType().then(res => {
        this.setShopType(res.data)
      })
    },
    kaidian () {
      if (!this.userInfo.userId) {
        this.$message({
          showClose: true,
          message: '开店请先登录'
        })
        this.$router.push('/login')
        this.noteKaidian()
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
      const userId = this.userInfo.userId
      this.logOut(userId)
      this.$message({
        showClose: true,
        message: '已退出'
      })
      this.$router.push('/')
    }
  },
  watch: {
    reLogin (lll) {
      if (lll) {
        this.$router.push('/login')
        this.setReLogin(false)
      }
    }
  },
  computed: {
    ...mapGetters(
      'user',
      [
        'userInfo',
        'reLogin'
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
  .footer
    margin-top: 10px
</style>
