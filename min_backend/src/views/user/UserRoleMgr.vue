<template>
  <div>
    <div class="top-panel__box">
      <el-form :inline="true" :model="roleSearchForm">
        <el-form-item label="角色ID：">
          <el-input v-model="roleSearchForm.roleid" placeholder="角色ID"/>
        </el-form-item>
        <el-form-item label="角色名称：">
          <el-input v-model="roleSearchForm.roleName" placeholder="角色名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRoleSearch" icon="search" class="search-btn">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            class="add-btn"
            @click="onAddRole" ><fa-icon class="fa-user-plus"/>新增角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table :data="roleList" class="user-role__table" v-loading="tableLoading" border stripe>
        <template v-for="column in USER_ROLE_THEAD">
          <el-table-column :prop="column.prop" :label="column.label" :width="column.width"/>
        </template>
        <el-table-column prop="operation" label="操作" :width="302">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="info"
              @click="onUpdateRole(scope.$index, scope.row)"><fa-icon class="fa-pencil-square"/>修改</el-button>
            <el-button
              size="small"
              type="danger"
              :loading="delBtnLoading === scope.$index"
              @click="onDeleteRole(scope.$index, scope.row)"
            >
              <fa-icon class="fa-trash" v-if="delBtnLoading !== scope.$index"/>删除
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="onManageRoleAuth(scope.$index, scope.row)"><fa-icon class="fa-cogs"/>权限管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginantion">
        <el-pagination
          @current-change="onCurrentChange"
          :current-page="currentPage"
          :page-size="TABLE_PAGE_SIZE"
          layout="total, prev, pager, next"
          :total="total"/>
      </div>
    </div>
  </div>
</template>

<script>
import FaIcon from '../../components/commons/FaIcon'
import { mapActions } from 'vuex'
import { USER_ROLE_THEAD, TABLE_PAGE_SIZE, REQUEST_SUCCESS } from '../../utils/constant'

export default {
  components: { FaIcon },
  data () {
    return {
      USER_ROLE_THEAD,
      TABLE_PAGE_SIZE,
      roleList: [],
      roleSearchForm: { roleid: '', roleName: '' },
      currentRoleId: '',
      currentRoleName: '',
      currentPage: 1,
      total: 0,
      tableLoading: false,
      isHandleSearch: false, // 搜索标识，阻止分页组件在currenPage改变时触发
      delBtnLoading: -1      // 表格中删除按钮的loading标识
    }
  },

  methods: {
    ...mapActions([
      'fetchUserRoles'
    ]),

    onRoleSearch () {
      this.isHandleSearch = true

      const { roleid, roleName } = this.roleSearchForm
      this.currentRoleId = roleid
      this.currentRoleName = roleName

      let params = {}
      roleid && (params.roleid = roleid)
      roleName && (params.roleName = roleName)

      this.currentPage = 1

      this.loadUserRoles(params)
    },

    onAddRole (index) {
      this.$router.push({ name: 'USER_ROLE_ADD' })
    },

    onCurrentChange (currentPage) {
      if (this.isHandleSearch) {
        this.isHandleSearch = false
        return
      }

      this.currentPage = currentPage
      const pageNum = currentPage
      const roleid = this.currentRoleId
      const roleName = this.currentRoleName

      let params = { pageNum }
      roleid && (params.aid = roleid)
      roleName && (params.roleName = roleName)

      this.loadUserRoles(params)
    },

    onUpdateRole (index, row) {

    },

    onDeleteRole (index, row) {
      this.delBtnLoading = index
      setTimeout(() => {
        this.delBtnLoading = -1
      }, 3000)
    },

    onManageRoleAuth (index, row) {

    },

    loadUserRoles (params) {
      this.tableLoading = true
      this.fetchUserRoles(params || {}).then(res => {
        const { code } = res

        if (code === REQUEST_SUCCESS) {
          const { total, jobs } = res
          this.total = total || 0
          this.roleList = []
          jobs.forEach(item => {
            this.roleList.push(item)
          })
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },

    deletePredAct (params, index) {

    }
  },
  created () {
    this.loadUserRoles()
  }
}
</script>

<style lang="scss" scoped>
.search-btn {
  margin-left: 20px;
}

.add-btn {
  margin-left: 6px;
}

.table-box {
  min-width: 1124px;
}

.user-role__table {
  width: 100%;
}

.text-lib__table .cell {
  line-height: 32px;
}

.paginantion {
  margin: 20px;
  float: right;
}
</style>
