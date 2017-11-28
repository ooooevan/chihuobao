<template>
  <div class="info">
    <h1>基本信息</h1>
    <el-form label-position="right" label-width="80px" :model="info">
      <el-form-item label="地址">
        <el-input v-model="info.address" disabled></el-input>
      </el-form-item>
      <el-form-item label="商标">
        <img :src="info.logo">
      </el-form-item>
      <el-form-item label="公告">
        <el-input v-model="info.notice"></el-input>
      </el-form-item>
      <el-form-item label="起送价">
        <el-input v-model="info.feeOption.start"></el-input>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="info.feeOption.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        info: {
          name: '海大饭堂',
          address: '海洋大学',
          logo: 'https://fuss10.elemecdn.com/1/3a/0ca3c4444df17c63481990018c2fejpeg.jpeg?imageMogr2/thumbnail/70x70/format/webp/quality/85',
          abstract: '这是商品简介',
          notice: '这是公告',
          feeOption: {
            price: 3,
            start: 10
          }
        }
      }
    },
    methods: {
      check () {
        this.$confirm('确认修改信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          alert('修改信息')
          // this.$message({
          //   type: 'success',
          //   message: '修改成功!'
          // })
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
  box-sizing: border-box
  background: #fff
  height: 100%
  h1
    font-size: 17px
    font-weight: 600
    margin: 20px
    text-align: center
  .el-form
    width: 50%
    margin: 0 auto
</style>
