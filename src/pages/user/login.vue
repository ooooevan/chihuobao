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
// import { mapActions } from 'vuex'
import { _login } from 'common/javascript/userApi'

export default {
  components: {
    resetPassword
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
          _login(phone, pass)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='sass'>
.register
  display: flex
  min-height: 300px
  .form
    width: 25%
    margin: 220px auto 100px
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
      .submit
        width: 100%
  .forget
    color: #409eff
    font-size: 15px
    cursor: pointer
</style>
