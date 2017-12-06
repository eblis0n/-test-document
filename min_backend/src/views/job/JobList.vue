<template>
  <div>
    <div class="top-panel__box">
      <el-form :inline="true" :model="jobSearchForm">
        <el-form-item label="任务ID">
          <el-input v-model="jobSearchForm.jobid" placeholder="任务ID"/>
        </el-form-item>
        <el-form-item label="触发类别">
          <el-select v-model="jobSearchForm.type" placeholder="触发类别">
            <el-option
              v-for="item in jobTypes"
              :key="item.value"
              :label="item.name"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onJobruleSearch" icon="search" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="">
      <el-table :data="jobList" class="text-lib__table" v-loading="tableLoading" border stripe>
        <template v-for="column in JOB_LIST_THEAD">
          <el-table-column :prop="column.prop" :label="column.label" :width="column.width"/>
        </template>
        <el-table-column prop="operation" label="操作" :width="302">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="info"
              @click="onEditJob(scope.$index, scope.row)"><fa-icon class="fa-pencil-square"/>编辑</el-button>
            <el-button
              size="small"
              type="danger"
              :loading="delBtnLoading === scope.$index"
              @click="onDeleteJob(scope.$index, scope.row)"
            >
              <fa-icon class="fa-trash" v-if="delBtnLoading !== scope.$index"/>删除
            </el-button>
            <el-button
              size="small"
              type="success"
              :loading="startBtnLoading === scope.$index"
              v-if="scope.row.status === JOB_IS_FORBIDDEN"
              @click="onStartJob(scope.$index, scope.row)"
            >
              <fa-icon class="fa-check-square" v-if="startBtnLoading !== scope.$index"/>启用
            </el-button>
            <el-button
              size="small"
              type="warning"
              :loading="forbiddenBtnLoading === scope.$index"
              v-if="scope.row.status === JOB_IS_STARTED"
              @click="onForbiddenJob(scope.$index, scope.row)"
            ><fa-icon class="fa-ban" v-if="forbiddenBtnLoading !== scope.$index"/>禁用</el-button>
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
import { JOB_LIST_THEAD, TABLE_PAGE_SIZE, JOB_TRIGGER_TYPE, REQUEST_SUCCESS } from '../../utils/constant'

const JOB_IS_FORBIDDEN = '0'
const JOB_IS_STARTED = '1'

export default {
  components: { FaIcon },
  data () {
    return {
      JOB_LIST_THEAD,
      TABLE_PAGE_SIZE,
      JOB_IS_FORBIDDEN,
      JOB_IS_STARTED,
      jobList: [],
      jobTypes: [],
      jobSearchForm: { jobid: '', type: '' },
      currentJobid: '',
      currentType: '',
      currentPage: 1,
      total: 0,
      tableLoading: false,
      isHandleSearch: false, // 搜索标识，阻止分页组件在currenPage改变时触发
      delBtnLoading: -1,      // 表格中删除按钮的loading标识
      startBtnLoading: -1,
      forbiddenBtnLoading: -1
    }
  },

  methods: {
    ...mapActions([
      'fetchJobList'
    ]),

    onJobruleSearch () {
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

    onStartJob (index, row) {
      this.startBtnLoading = index
      setTimeout(() => {
        this.startBtnLoading = -1

        let item = this.jobList[index]
        item.status = '1'
        this.$set(this.jobList, index, item)
      }, 3000)
    },

    onEditJob (index, row) {
      const jobid = row.jobid
      this.$router.push({ name: 'JOB_UPDATE', params: { jobid } })
    },

    onForbiddenJob (index, row) {
      this.forbiddenBtnLoading = index
      setTimeout(() => {
        this.forbiddenBtnLoading = -1

        let item = this.jobList[index]
        item.status = '0'
        this.$set(this.jobList, index, item)
      }, 3000)
    },

    onDeleteJob (index, row) {
      this.delBtnLoading = index

      setTimeout(() => {
        this.delBtnLoading = -1
      }, 3000)
    },

    loadJobs (params) {
      this.tableLoading = true
      this.fetchJobList(params || {}).then(res => {
        this.tableLoading = false

        console.log('res = ', res)
        const { code } = res
        if (code === REQUEST_SUCCESS) {
          const { total, jobs } = res
          this.total = total || 0
          this.jobList = []
          jobs.forEach(item => {
            this.jobList.push(item)
          })
        }
      })
    },

    deletePredAct (params, index) {

    }
  },
  created () {
    this.loadJobs()

    for (let item in JOB_TRIGGER_TYPE) {
      this.jobTypes.push(JOB_TRIGGER_TYPE[item])
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
