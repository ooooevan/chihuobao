<template>
  <div>
    <div class="form">
      <div class="formHead">注册</div>
      <el-form :model="ruleForm" status-icon :rules="rules" size='small' ref="ruleForm" class="ruleForm">
        <el-form-item prop="phone">
          <el-input placeholder="手机号" v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input placeholder="密码" type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="checkPass">
          <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item prop="code" class='codeProp'>
          <el-input class='setCode' placeholder="验证码" type="text" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          <el-button class='getCode' :disabled='disabled' type="primary" @click="sendCode">{{codeText}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class='submit' type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

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
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sendCode () {
      this.codeText = `60秒`
      this.disabled = true
      // this._sendCode()
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
    }
  }
}
</script>

<style scoped lang='sass'>
  .form
    width: 25%
    margin: 100px auto 0
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
