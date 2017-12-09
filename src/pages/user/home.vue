<template>
  <div class='home'>
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
        :trigger-on-focus='true'
        @select='handleSelect'
      ><el-cascader slot='prepend'
          :options='cityOptions'
          :show-all-levels='false'
          :placeholder='location'
          v-model='locationCascader'
          ref='el-cascader'
        ></el-cascader>
        <el-button class='search' slot='append' @click='search'>搜索</el-button>
      </el-autocomplete>
    </div>
    <div class='div'>当前城市：{{locationCascader && locationCascader.length > 0 && locationCascader || location}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { _initCity } from 'common/javascript/userApi'
export default {
  data () {
    return {
      location: '请选择',
      isSelect: false,  // 用户是否手动选择区域
      input: '',
      locationCascader: []
    }
  },
  created () {
    this.initCity()
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
      this.cb && this.cb(newList)
    },
    locationCascader (newValue) {
      this._selectLocation([newValue[0], newValue[1] || newValue[0]])
      this.isSelect = true
      console.log(`选择了：${newValue.join('')}`)
    }
  },
  methods: {
    search () {
      this.$refs['input'].$el.getElementsByClassName('el-input__inner')[1].focus()
    },
    querySearchAsync (string, cb) {
      if (string.trim() === '') {
        // eslint-disable-next-line
        cb([])
        return
      }
      this.getSuggestion(string.trim())
      this.cb = cb
    },
    handleSelect (item) {
      this.saveExactAddress(item)
      this.$router.push('/place')
    },
    _selectLocation ([province, city]) {
      this.setInexactAddress([province, city])
      this.clearSuggestionsList()
    },
    initCity () {
      _initCity().then(res => {
        if (!this.isSelect) {
          console.log(`定位到：${res.address_detail.province}${res.address_detail.city}`)
          this.setInexactAddress([res.address_detail.province, res.address_detail.city])
          this.location = res.address_detail.city
        }
      })
    },
    ...mapActions(
      'user',
      [
        'getSuggestion',
        'saveExactAddress'
      ]),
    ...mapMutations({
      setInexactAddress: 'user/SET_INEXACT_CITY',
      setCoordinate: 'user/SET_COORDINATE',
      clearSuggestionsList: 'user/CLEAR_SUGGESTIONS_LIST'
    })
  }
}
</script>

<style lang='sass'>
  $width : 550px
  .home
    min-height: 600px
    position: relative
    &:after
      content: ""
      background: url('../../common/images/1.jpg')
      background-size: cover
      position: absolute
      // filter: blur(5px)
      top: 0
      bottom: 0
      left: 0
      right: 0
  .input-with-cascader
    width: $width
  .el-cascader
    width: 100px
  .searchBox
    width: $width
    padding-top: 230px
    margin: 0 auto
    position: relative
    z-index: 10
    .el-autocomplete.input-with-cascader
      transform: scale(1.1, 1.1)
      .el-input-group__append
        background: #ff3838
        border-color: #ff3838
        .search
          background: #ff3838
          color: #fff
          border-color: #ff3838

</style>
