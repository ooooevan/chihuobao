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
          prop="name"
          label="用户名"
          width="280">
        </el-table-column>
        <el-table-column label="模块权限">
          <el-table-column
            align='center'
            prop="class"
            label="分类管理"
            width="180">
          </el-table-column>
          <el-table-column
            align='center'
            prop="shop"
            label="商铺管理"
            width="180">
          </el-table-column>
          <el-table-column
            align='center'
            prop="user"
            label="用户管理"
            width="180">
          </el-table-column>
          <el-table-column
            align='center'
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleShow(scope.row)" type="text" size="small">修改权限</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改权限" :visible.sync="detailVisible">
      <el-form :model="current">
        <el-form-item label="分类管理">
          <el-select v-model="current.class">
            <el-option value="0"></el-option>
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺管理">
          <el-select v-model="current.shop">
            <el-option value="0"></el-option>
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户管理">
          <el-select v-model="current.user">
            <el-option value="0"></el-option>
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary" @click="change">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增管理员" :visible.sync="newVisible">
      <el-form :model='newAdmin'>
        <el-form-item label="用户名" label-width="120px">
         <el-input v-model="newAdmin.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="newAdmin.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类管理权限" label-width="120px">
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
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        AUTH: ['无权限', '有权限'],
        adminList: [
          {
            name: '管理员1',
            class: 0,
            shop: 1,
            user: 1
          },
          {
            name: '管理员2',
            class: 0,
            shop: 1,
            user: 1
          },
          {
            name: '管理员3',
            class: 1,
            shop: 1,
            user: 0
          },
          {
            name: '管理员4',
            class: 1,
            shop: 0,
            user: 1
          }
        ],
        detailVisible: false,
        current: {},
        newVisible: false,
        newAdmin: {}
      }
    },
    methods: {
      addNew () {
        this.newVisible = true
      },
      addAdmin () {
        alert(JSON.stringify(this.newAdmin))
        this.newVisible = false
      },
      change () {
        alert('修改权限')
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
