<template>
  <div>
    <div class='searchBox'>
      <el-autocomplete 
        placeholder='请输入内容' 
        ref='input' 
        v-model='input' 
        class='input-with-cascader'
        valueKey='name'
        popper-class='popper-class'
        :debounce=300
        :fetch-suggestions='querySearchAsync'
        :trigger-on-focus='false'
        @select='handleSelect'
      ><el-cascader slot='prepend'
          :options='cityOptions'
          :show-all-levels='false'
          :placeholder='location'
          v-model='locationCascader'
          ref='el-cascader'
        ></el-cascader>
        <el-button slot='append' @click='search'>搜索</el-button>
      </el-autocomplete>
    </div>
    <div class='div'>当前位置：{{locationCascader && locationCascader.length > 0 && locationCascader || location}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getCity } from 'assets/javascript/api'
export default {
  data () {
    return {
      location: '请选择',
      input: '',
      locationCascader: []
    }
  },
  created () {
    this._getLocation()
  },
  mounted () {
    const prepend = this.$refs.input.$el.getElementsByClassName('el-input-group__prepend')[0]
    prepend.style.padding = 0
    prepend.style.border = 0
  },
  computed: {
    ...mapGetters(
      'user',
      [
        'cityOptions',
        'suggestionsList'
      ])
  },
  watch: {
    suggestionsList (newList) {
      this.cb(newList)
    },
    locationCascader (newValue) {
      console.log(newValue[0])
      console.log(newValue[1])
    }
  },
  methods: {
    search () {
      this.$refs['input'].$el.getElementsByClassName('el-input__inner')[1].focus()
    },
    querySearchAsync (string, cb) {
      if (string.trim() === '') return
      this.getSuggestion(string.trim())
      this.cb = cb
    },
    handleSelect (item) {
      this.saveAddress(item)
      this.$router.push('/place')
    },
    _getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(`经度：${position.coords.longitude}`)
          console.log(`纬度：${position.coords.latitude}`)
          this.setCoordinate([position.coords.longitude, position.coords.latitude])
          getCity(position.coords.latitude, position.coords.longitude).then(result => {
            // province = result.addressComponent.province
            // city = result.addressComponent.city
            // district = result.addressComponent.district
            // formatted_address = result.formatted_address
            // console.log(result.formatted_address)
            this.location = result.addressComponent.city
            this.pois = result.pois
          })
        }, (positionError) => {
          console.log(`获取位置失败： ${positionError.code}, ${positionError.message}`)
        })
      } else {
        console.log(`浏览器不支持navigator.geolocation定位`)
      }
    },
    ...mapActions(
      'user',
      [
        'getSuggestion',
        'saveAddress'
      ]),
    ...mapMutations({
      setCoordinate: 'user/SET_COORDINATE'
    })
  }
}
</script>

<style scoped lang='sass'>
  .el-cascader
    width: 100px
  .searchBox
    width: 50%
    margin: 0 auto

  
</style>
