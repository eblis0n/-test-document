<template>
  <div>
    <div class="top-panel__box">
      <el-form :inline="true" :model="predSearchForm" class="demo-form-inline">
        <el-form-item label="动作ID">
          <el-input v-model="predSearchForm.aid" placeholder="动作ID"/>
        </el-form-item>
        <el-form-item label="动作类型">
          <el-select v-model="predSearchForm.type" placeholder="动作类型">
            <el-option
              v-for="item in predTypeSelects"
              :key="item.value"
              :label="item.name"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPredefineSearch" icon="search" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="">
      <el-table :data="predefineList" class="text-lib__table" border stripe v-loading="tableLoading">
        <template v-for="column in PREDEFINE_LIST_THEAD">
          <el-table-column :prop="column.prop" :label="column.label" :width="column.width"/>
        </template>
        <el-table-column prop="operation" label="操作" :width="302">
          <template slot-scope="scope">
            <el-button size="small"
              type="primary"
              v-if="scope.row.type === PREDEFINE_COUPON"
              @click="onCouponMrg(scope.$index, scope.row)">优惠券管理</el-button>
            <el-button size="small"
              @click="onEditPreAction(scope.$index, scope.row)" type="info"><fa-icon class="fa-pencil-square-o"/>编辑</el-button>
            <el-button size="small"
              type="danger"
              :loading="delBtnLoading[scope.$index]"
              @click="onDeletePredAct(scope.$index, scope.row)"><fa-icon class="fa-trash"/>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginantion">
        <el-pagination
          @current-change="onCurrentChange"
          :current-page="currentPage"
          :page-size="TABLE_PAGE_SIZE"
          layout="total, prev, pager, next"
          :total="predefineTotal"/>
      </div>
    </div>
  </div>
</template>

<script>
import FaIcon from '../../components/commons/FaIcon'
import { mapActions } from 'vuex'
import { PREDEFINE_LIST_THEAD, TABLE_PAGE_SIZE, PREDEFINE_TYPE, REQUEST_SUCCESS } from '../../utils/constant'

const PREDEFINE_COUPON = '8' // 优惠券预定义动作类型

export default {
  components: { FaIcon },
  data () {
    return {
      PREDEFINE_LIST_THEAD,
      TABLE_PAGE_SIZE,
      PREDEFINE_COUPON,
      predefineList: [],
      predTypeSelects: [],
      predSearchForm: { aid: '', type: '' },
      currentAid: '',
      currentType: '',
      currentPage: 1,
      predefineTotal: 0,
      tableLoading: false,
      isHandleSearch: false, // 搜索标识，阻止分页组件在currenPage改变时触发
      delBtnLoading: []      // 表格中删除按钮的loading标识
    }
  },

  methods: {
    ...mapActions([
      'fetchPredefineActions',
      'deletePredefineAction'
    ]),
    onPredefineSearch () {
      this.isHandleSearch = true

      const { aid, type } = this.predSearchForm
      this.currentAid = aid
      this.currentType = type

      let params = {}
      aid && (params.aid = aid)
      type && (params.type = type)

      this.currentPage = 1

      this.loadPredefineActs(params)
    },

    onCurrentChange (currentPage) {
      if (this.isHandleSearch) {
        this.isHandleSearch = false
        return
      }

      this.currentPage = currentPage
      const pageNum = currentPage
      const aid = this.currentAid
      const type = this.currentType

      let params = { pageNum }
      aid && (params.aid = aid)
      type && (params.type = type)

      this.loadPredefineActs(params)
    },

    onEditPreAction (index, row) {
      const aid = row.aid
      const type = row.type
      this.$router.push({
        name: 'PREDINE_UPDATE',
        params: { type },
        query: { aid }
      })
    },

    onCouponMrg (index, row) {
      const { actid } = row
      this.$router.push({
        name: 'COUPON_MGR',
        params: { actid }
      })
    },

    onDeletePredAct (index, row) {
      const aid = row.aid
      this.deletePredAct({ aid }, index)
    },

    loadPredefineActs (params) {
      this.tableLoading = true
      this.fetchPredefineActions(params || {}).then(res => {
        this.tableLoading = false
        this.isHandleSearch = false

        const { code } = res
        if (code === REQUEST_SUCCESS) {
          this.predefineList = []
          this.predefineList = res.acts || []
          this.predefineList.forEach(item => {
            this.delBtnLoading.push(false)  // 初始化表格中每行的删除按钮loading标识
          })

          this.predefineTotal = res.total || 0
        }
      }).catch(err => {
        this.tableLoading = false
        throw err
      })
    },

    deletePredAct (params, index) {
      this.$set(this.delBtnLoading, index, true)
      this.deletePredefineAction(params).then(res => {
        this.$set(this.delBtnLoading, index, false)

        const { code, result } = res
        if (code === REQUEST_SUCCESS) {
          this.predefineList.splice(index, 1)
          this.delBtnLoading.splice(index, 1)
          this.predefineTotal--

          this.$message({ showClose: true, message: `预定义${result}`, type: 'success' })

          // 更新table数据，保持当前页为最新
          const pageNum = this.currentPage
          const aid = this.currentAid
          const type = this.currentType

          let params = { pageNum }
          aid && (params.aid = aid)
          type && (params.type = type)

          this.loadPredefineActs(params)
        }
      }).catch(err => {
        this.$set(this.delBtnLoading, index, false)
        throw err
      })
    }
  },
  created () {
    this.loadPredefineActs()

    for (let item in PREDEFINE_TYPE) {
      this.predTypeSelects.push(PREDEFINE_TYPE[item])
    }
  }
}
</script>

<style lang="scss" scoped>
.search-btn {
  margin-left: 60px;
}

.text-lib__table {
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
