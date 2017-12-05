<template>
  <div class='register'>
    <div class="form">
      <div class="formHead">登录</div>
      <el-form :model="ruleForm" status-icon :rules="rules" size='small' ref="ruleForm" class="ruleForm">
        <el-form-item prop="phone">
          <el-input placeholder="手机号" v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input placeholder="密码" type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop='type' class='type'>
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="1">用户</el-radio>
            <el-radio label="2">商户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class='submit' type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <a class='forget' @click='showForget'>忘记密码？</a>
    </div>
    <reset-password @close='close' :visible='resetVisible'></reset-password>
  </div>
</template>

<script>
import resetPassword from 'components/resetPassword'
import { mapActions, mapGetters } from 'vuex'
import { _login } from 'common/javascript/userApi'
import { _hashExactAddress } from 'common/javascript/cache'

export default {
  components: {
    resetPassword
  },
  computed: {
    ...mapGetters(
      'user',
      [
        'noteKaidian'
      ]
      )
  },
  data () {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (`${value}`.length !== 11) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        }
      }, 100)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        type: '1',
        pass: '',
        phone: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      resetVisible: false
    }
  },
  methods: {
    ...mapActions('user',
      [
        'saveUserInfo'
      ]
    ),
    close () {
      this.resetVisible = false
    },
    showForget () {
      this.resetVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { pass, phone } = this.ruleForm
          _login(phone, pass).then(obj => {
            const { id, name, code } = obj
            this.saveUserInfo({name, id})
            if (!code) {
              if (this.noteKaidian) {
                this.$confirm('是否马上申请开店?', '提示', {
                  confirmButtonText: '申请',
                  cancelButtonText: '取消',
                  type: 'info'
                }).then(() => {
                  this.$router.push('/applyShop')
                }).catch(() => {
                  this.normalLogin()
                })
              } else {
                this.normalLogin()
              }
            } else {
              this.$message({
                showClose: true,
                message: '登录失败',
                type: 'error'
              })
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    normalLogin () {
      if (_hashExactAddress()) {
        this.$router.push('/place')
      } else {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped lang='sass'>
.register
  display: flex
  min-height: 620px
  .form
    width: 25%
    margin: auto
    padding: 20px
    border-radius: 5px
    background: #fff
    min-width: 350px
    max-width: 400px
    .formHead
      text-align: center
      margin: 10px
      font-size: 20px
    .ruleForm
      text-align: center
      .type
        text-align: left
      .submit
        width: 100%
  .forget
    color: #409eff
    font-size: 15px
    cursor: pointer
</style>
