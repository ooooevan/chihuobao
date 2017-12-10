<template>
  <div class="info">
    <h1>基本信息</h1>
    <el-form label-position="right" label-width="150px" size='small' :model="info">
      <el-form-item label="用户名">
        <el-input v-model="info.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="info.gender" placeholder="请选择性别">
          <el-option :key='item.value' :label='item.label' :value='item.value' v-for='item in types'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="info.introduction"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-cascader
          class='address'
          :options="cityOptions"
          change-on-select
          v-model='address'
        ></el-cascader>
        <el-input class='acceptAddress' v-model="info.acceptAddress"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <img :src="info.avator">
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="info.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { _initInfo, _modifyInfo } from 'common/javascript/userApi'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        info: {
          userName: '',
          avator: '',
          gender: '',
          introduction: '',
          phone: '',
          acceptAddress: ''
        },
        address: [],
        types: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 0
          }
        ]
      }
    },
    computed: {
      ...mapGetters('user',
        [
          'userInfo',
          'cityOptions'
        ]
      )
    },
    created () {
      this.initInfo()
    },
    methods: {
      initInfo () {
        const userId = this.userInfo.userId
        _initInfo(userId).then(res => {
          this.info.userName = res.data.userName
          this.info.avator = res.data.avator
          this.info.gender = res.data.gender
          this.info.acceptAddress = res.data.acceptAddress
          this.info.introduction = res.data.introduction
          this.info.phone = res.data.phone
        })
      },
      check () {
        this.$confirm('确认修改信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((re) => {
          let { info, address } = this
          info.userId = this.userInfo.userId
          info.acceptAddress = `${address.join('')}${info.acceptAddress}`
          _modifyInfo(info).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.initInfo()
            } else {
              this.$message({
                type: 'error',
                message: '修改失败!'
              })
            }
          })
        }).catch(() => {
          console.log('取消修改信息')
        })
      }
    }
  }
</script>
<style scoped lang='sass'>
.info
  padding: 10px
  height: 100%
  box-sizing: border-box
  background: #fff
  h1
    font-size: 17px
    font-weight: 600
    margin: 20px
    text-align: center
  .el-form
    width: 50%
    margin: 0 auto
  .acceptAddress, .address
    display: inline-block
  .acceptAddress
    width: 65%
  .address
    width: 30%
</style>
