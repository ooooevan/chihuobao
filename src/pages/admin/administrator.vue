<template>
  <div class="user">
    <div class="header">
      <el-button @click='addNew' icon="el-icon-plus" size="small" round>新增管理员</el-button>
    </div>
    <div class="content">
      <el-table
        :data="adminList"
        class='_el-table'>
        <el-table-column
          align='center'
          prop="adminName"
          label="用户名"
          width="280">
        </el-table-column>
        <el-table-column label="模块权限">
          <el-table-column
            align='center'
            prop="shopMp"
            label="商铺管理"
            width="180">
          </el-table-column>
          <el-table-column
            align='center'
            prop="shopTypeMp"
            label="商铺分类管理"
            width="180">
          </el-table-column>
          <el-table-column
            align='center'
            prop="foodTypeMp"
            label="食物分类管理"
            width="180">
          </el-table-column>
          <!-- <el-table-column
            align='center'
            prop="user"
            label="用户管理"
            width="180">
          </el-table-column> -->
          <el-table-column
            align='center'
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleShow(scope.row)" type="text" size="small">修改权限</el-button>
              <el-button @click="handledel(scope.row)" type="text" size="small">删除管理员</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改权限" :visible.sync="detailVisible">
      <el-form :model="current" label-position='left'>
        <el-form-item label="商铺分类管理">
          <el-select v-model="current.shopTypeMp">
            <el-option label='无权限' value=0></el-option>
            <el-option label='有权限' value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食物分类管理">
          <el-select v-model="current.foodTypeMp">
            <el-option label='无权限' value=0></el-option>
            <el-option label='有权限' value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺管理">
          <el-select v-model="current.shopMp">
            <el-option label='无权限' value=0></el-option>
            <el-option label='有权限' value=1></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="用户管理">
          <el-select v-model="current.user">
            <el-option value="0"></el-option>
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary" @click="change">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增管理员" :visible.sync="newVisible">
      <el-form :model='newAdmin'>
        <el-form-item label="用户名" label-width="120px">
         <el-input v-model="newAdmin.adminName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="newAdmin.adminPwd" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="分类管理权限" label-width="120px">
          <el-select v-model="newAdmin.class">
            <el-option value="0"></el-option>
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺管理权限" label-width="120px">
          <el-select v-model="newAdmin.shop">
            <el-option value="0"></el-option>
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户管理权限" label-width="120px">
          <el-select v-model="newAdmin.user">
            <el-option value="0"></el-option>
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { _addAdmin, _getAdminList, _delAdmin, _adminConfig } from 'common/javascript/adminApi'
  import config from 'common/javascript/config'
  export default {
    data () {
      return {
        adminList: [],
        detailVisible: false,
        current: {},
        newVisible: false,
        newAdmin: {},
        auth: config.auth
      }
    },
    created () {
      this.getAdminList()
    },
    methods: {
      addNew () {
        this.newVisible = true
      },
      handledel (item) {
        this.$confirm('是否删除该管理员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _delAdmin(item.adminName).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
            this.getAdminList()
          })
        }).catch(() => {
          console.log('取消删除管理员')
        })
      },
      addAdmin () {
        const { adminName, adminPwd } = this.newAdmin
        _addAdmin(adminName, adminPwd).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.newVisible = false
          } else {
            this.$message({
              type: 'error',
              message: '新增失败'
            })
          }
          this.getAdminList()
        })
      },
      getAdminList () {
        _getAdminList().then(res => {
          // 将入口的数据改成有语义话的，1表示有权限
          this.adminList = res.data.list.map(item => {
            return Object.assign(item, {
              shopMp: config.auth[item.shopMp],
              shopTypeMp: config.auth[item.shopTypeMp],
              foodTypeMp: config.auth[item.foodTypeMp]
            })
          })
        })
      },
      change () {
        let { adminName, foodTypeMp, shopMp, shopTypeMp } = this.current
        // 出口数据要保证是数据，因为修改时，选择了就是数字，为修改的还是字符串如'无权限',则需要改成数字
        if (isNaN(foodTypeMp)) foodTypeMp = this.auth.findIndex(item => item === foodTypeMp)
        if (isNaN(shopMp)) shopMp = this.auth.findIndex(item => item === shopMp)
        if (isNaN(shopTypeMp)) shopTypeMp = this.auth.findIndex(item => item === shopTypeMp)
        _adminConfig(adminName, foodTypeMp, shopMp, shopTypeMp).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '配置成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '配置失败'
            })
          }
          this.getAdminList()
        })
        this.detailVisible = false
      },
      handleShow (item) {
        this.current = item
        this.detailVisible = true
      }
    }
  }
</script>
<style lang='sass'>
.user
  background: #fff
  height: 100%
  padding: 20px
  box-sizing: border-box
  .content
    margin: 30px auto
    .el-table._el-table
      width: 100%
      .el-table__body-wrapper
        overflow: hidden

</style>
