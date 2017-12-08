<template>
  <div class='register'>
    <div class="form">
      <div class="formHead">注册</div>
      <el-form :model="ruleForm" status-icon :rules="rules" size='small' ref="ruleForm" class="ruleForm">
        <el-form-item prop="phone">
          <el-input placeholder="手机号" v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input placeholder="密码" type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code" class='codeProp'>
          <el-input class='setCode' placeholder="验证码" type="text" v-model="ruleForm.code" auto-complete="off"></el-input>
          <el-button class='getCode' :disabled='disabled' type="primary" @click="sendCode">{{codeText}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class='submit' type="primary" @click="register('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { _sendCode, _register } from 'common/javascript/userApi'

export default {
  data () {
    var checkPhone = (rule, value, callback) => {
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        code: '',
        phone: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      codeText: '获取验证码',
      disabled: false,
      timer: null
    }
  },
  methods: {
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { pass, code, phone } = this.ruleForm
          _register(phone, pass, code).then(obj => {
            if (obj.code === 1) {
              this.$message({
                showClose: true,
                message: '注册成功，请登录',
                type: 'success'
              })
              this.$router.push('/login')
            } else if (obj.code === 603) {
              this.$message({
                showClose: true,
                message: '该手机号已注册，请登录',
                type: 'error'
              })
              this.$router.push('/login')
            } else {
              this.$message({
                showClose: true,
                message: '注册失败，请稍后再试',
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    sendCode () {
      const phone = this.ruleForm.phone
      if (Number.isInteger(phone) && `${phone}`.length === 11) {
        // 发送验证码
        this.disabled = true
        _sendCode(phone).then(obj => {
          if (obj.code === 1) {
            this.$message({
              showClose: true,
              message: '已发送',
              type: 'success'
            })
            this.codeText = `60秒`
            this.disabled = true
            this.timer = setInterval(() => {
              this.codeText = parseInt(this.codeText) - 1
              if (this.codeText === 0) {
                this.codeText = '获取验证码'
                this.disabled = false
                clearInterval(this.timer)
              } else {
                this.codeText = `${this.codeText}秒`
              }
            }, 1000)
          } else {
            this.$message({
              showClose: true,
              message: '发送失败',
              type: 'error'
            })
            this.disabled = false
          }
        })
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
      .codeProp
        .setCode
          width: 60%
          float: left
        .getCode
          width: 30%
          float: right
      .submit
        width: 100%
</style>
