<template>
  <el-dialog :visible.sync='visible' :before-close='close'>
    <p>重置密码</p>
      <el-form :model="ruleForm" status-icon :rules="rules" size='small' ref="ruleForm" class="ruleForm">
        <el-form-item prop="phone">
          <el-input placeholder="手机号" v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input placeholder="密码" type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code" class='codeProp'>
          <el-input class='setCode' placeholder="验证码" type="text" v-model="ruleForm.checkCode" auto-complete="off"></el-input>
          <el-button class='getCode' :disabled='disabled' type="primary" @click="sendCode">{{codeText}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class='submit' type="primary" @click="submitForm('ruleForm')">重置密码</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>
<script>
import { _sendCode, _reset } from 'common/javascript/userApi'
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value) || `${value}`.length !== 11) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 100)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        checkCode: '',
        phone: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
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
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 这里发送重置密码。若验证码错误，请求回来再提示验证码错误
          if (this.ruleForm.checkCode) {
            // 发送请求
            const { checkCode, pass, phone } = this.ruleForm
            _reset(phone, pass, checkCode).then(obj => {
              if (obj.code === 1) {
                this.$message({
                  showClose: true,
                  message: '重置成功',
                  type: 'success'
                })
                this.$emit('close')
              } else if (obj.code === 605) {
                this.$message({
                  showClose: true,
                  message: '该手机号未注册',
                  type: 'error'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '重置失败，请稍后再试',
                  type: 'error'
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang='sass'>
.el-dialog
  width: 40%
  p
    font-size: 20px
    font-weight: 600
    text-align: center
    margin: 10px auto
  .setCode
    width: 80%
  .getCode
    float: right
</style>
