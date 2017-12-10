<template>
  <el-dialog :visible.sync='visible' :before-close='close'>
    <p>管理员登录</p>
      <el-form :model="ruleForm" status-icon :rules="rules" size='small' ref="ruleForm" class="ruleForm">
        <el-form-item prop="phone">
          <el-input placeholder="账号" v-model.number="ruleForm.phone"></el-input>
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
import { _login } from 'common/javascript/adminApi'
import { mapActions } from 'vuex'
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
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
          { validator: validatePass }
        ],
        phone: [
          { validator: checkPhone }
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
    ...mapActions('admin',
      [
        'saveAdminInfo'
      ]
    ),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送请求
          const { pass, phone } = this.ruleForm
          _login(phone, pass).then(obj => {
            if (obj.code === 1) {
              this.saveAdminInfo(obj.data)
              this.$emit('close')
              this.$router.push('/admin/user')
            } else {
              this.$message({
                showClose: true,
                message: '登录失败',
                type: 'error'
              })
            }
          })
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
