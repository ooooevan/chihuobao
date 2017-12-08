<template>
  <el-dialog :visible.sync='visible' :before-close='close'>
    <p>管理员登录</p>
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
  </el-dialog>
</template>
<script>
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
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送请求
          // const { checkcode, pass, phone } = this.ruleForm
          // _reset(phone, pass, checkcode).then(obj => {
          //   if (obj.code === 1) {
          //     this.$message({
          //       showClose: true,
          //       message: '重置成功',
          //       type: 'success'
          //     })
          //     this.$emit('close')
          //   } else if (obj.code === 605) {
          //     this.$message({
          //       showClose: true,
          //       message: '该手机号未注册',
          //       type: 'error'
          //     })
          //   } else {
          //     this.$message({
          //       showClose: true,
          //       message: '重置失败，请稍后再试',
          //       type: 'error'
          //     })
          //   }
          // })
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
<style lang='sass'>
.el-dialog
  width: 30%
  text-align: center
  p
    font-size: 20px
    font-weight: 600
    text-align: center
    margin: 0 auto 20px
</style>
