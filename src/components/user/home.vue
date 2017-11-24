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
        <el-button slot='append' @click='search'>搜索</el-button>
      </el-autocomplete>
    </div>
    <div class='div'>当前城市：{{locationCascader && locationCascader.length > 0 && locationCascader || location}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { initCity } from 'common/javascript/api'
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
    this._initCity()
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
    _initCity () {
      initCity().then(res => {
        if (!this.isSelect) {
          console.log(`定位到：${res.province}${res.city}`)
          this.setInexactAddress([res.province, res.city])
          this.location = res.city
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

<style scoped lang='sass'>
  $width : 550px
  .home
    padding: 1px
  .input-with-cascader
    width: $width
  .el-cascader
    width: 100px
  .searchBox
    width: $width
    margin: 200px auto


  
</style>
