<template>
  <div class="info">
    <h1>基本信息</h1>
    <el-form label-position="right" label-width="150px" size='small' :model="info">
      <el-form-item label="名称">
        <el-input v-model="info.shopName" disabled></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="info.shopAbstract"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="info.shopLocation"></el-input>
      </el-form-item>
      <el-form-item label="商标">
        <img :src="info.shopLogo">
      </el-form-item>
      <el-form-item label="公告">
        <el-input v-model="info.shopAnnouncement"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="info.shopPhone"></el-input>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-input v-model="info.shopWorkTime"></el-input>
      </el-form-item>
      <el-form-item label="起送价">
        <el-input v-model="info.shopStartDelivery"></el-input>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="info.shopDeliveryCost"></el-input>
      </el-form-item>
      <el-form-item label="评价送达时间">
        <el-input v-model="info.deliveryTime" disabled=""></el-input>
      </el-form-item>
      <el-form-item label="评价">
        <el-rate
          disabled
          class='el-rate'
          ref='el-rate'
          v-model='info.level'
          show-score
          text-color='#ff9900'>
        </el-rate>
      </el-form-item>
      <el-form-item label="门面照">
        <img :src="info.shopStoresImages" width="50%">
      </el-form-item>
      <el-form-item label="商铺照">
        <img :src="info.shopDetailImages" width="50%">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { _initInfo, _modifyShopInfo } from 'common/javascript/sellerApi'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        info: {
          shopName: '',
          shopId: 1,
          shopAbstract: '',
          shopLocation: '',
          shopLogo: '',
          shopAnnouncement: '',
          shopDeliveryCost: 1,
          shopStartDelivery: 1,
          shopStoresImages: '',
          shopDetailImages: '',
          shopWorkTime: '',
          deliveryTime: '',
          level: 0

        }
      }
    },
    computed: {
      ...mapGetters('seller',
        [
          'sellerInfo'
        ]
      )
    },
    created () {
      this.initInfo()
    },
    methods: {
      initInfo () {
        const shopId = this.sellerInfo.shopId
        _initInfo(shopId).then(res => {
          this.info.shopName = res.data.shopName
          this.info.shopLogo = res.data.shopLogo
          this.info.shopId = res.data.shopId
          this.info.shopAbstract = res.data.shopAbstract
          this.info.shopLocation = res.data.shopLocation
          this.info.shopAnnouncement = res.data.shopAnnouncement
          this.info.shopPhone = res.data.shopPhone
          this.info.shopWorkTime = res.data.shopWorkTime
          this.info.shopDeliveryCost = res.data.shopDeliveryCost
          this.info.shopStartDelivery = res.data.shopStartDelivery
          this.info.shopStoresImages = res.data.shopStoresImages
          this.info.shopDetailImages = res.data.shopDetailImages
          this.info.deliveryTime = res.data.deliveryTime
          this.info.level = res.data.level
        })
      },
      check () {
        this.$confirm('确认修改信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((re) => {
          let { info } = this
          info.shopId = this.sellerInfo.shopId
          _modifyShopInfo(info).then(res => {
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
    .el-rate
      transform: translateY(9px)
</style>
