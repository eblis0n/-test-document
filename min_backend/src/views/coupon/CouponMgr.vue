<template>
  <div>
    <div class="top-panel__box" v-loading="loadingCouponID">
      <div class="coupon-info">
        <span>动&ensp;作&ensp;ID：</span>
        <span>{{ actid }}</span>
      </div>
      <div class="coupon-info">
        <span>券&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID：</span>
        <span>{{ coupid }}</span>
      </div>
      <div class="upload">
        <el-upload
          class="upload-elem"
          :action="ADD_UPLOAD_URL"
          :http-request="onUploadForAdd"
          :show-file-list="false"
          :disabled="addUploading"
        >
          <div class="upload-desc">批量新增：</div>
          <el-button
            type="primary"
            class="upload-btn"
            :loading="addUploading">{{ addUploadBtnText }}</el-button>
          <a
            href="#"
            class="download-demo"
            @click="onDownloadDemoFile($event, 'ADD')">示例文件下载</a>
        </el-upload>
      </div>
      <div class="upload">
        <el-upload
          class="upload-elem"
          :action="DELETE_UPLOAD_URL"
          :http-request="onUploadForRemove"
          :show-file-list="false"
          :disabled="removeUploading"
        >
          <div class="upload-desc">批量删除：</div>
          <el-button
            type="primary"
            class="upload-btn"
            :loading="removeUploading">{{ removeUploadBtnText }}</el-button>
          <a
            href="#"
            class="download-demo"
            @click="onDownloadDemoFile($event, 'DELETE')">示例文件下载</a>
        </el-upload>
      </div>
    </div>
    <div class="top-panel__box coupon-stats__box">
      <el-form :inline="true" :model="couponSearchForm" class="form-inline">
        <el-form-item>
          <div class="upload-stat">
            <span>已上传数量：</span><span>{{ uploadedCount }}</span>
            <span>已领取数量：</span><span>{{ receiveCount }}</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="ftp-btn"
            v-if="uploadedCount"
            :loading="ftpBtnLoading"
            @click="onTransferToFtp">传输至ftp</el-button>
        </el-form-item>
        <el-form-item label="优惠券码：" prop="couponCode">
          <el-input
            v-model="couponSearchForm.couponCode"
            placeholder="请输入券码"
            class="coupon-input"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="search"
            class="search-btn"
            :loading="searchBtnLoading"
            @click="onCouponSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="uploadedCoupons" border stripe v-loading="tableLoading">
        <template v-for="column in COUPON_LIST_THEAD">
          <el-table-column :prop="column.prop" :label="column.label" :width="column.width"/>
        </template>
      </el-table>
      <div class="paginantion">
        <el-pagination
          @current-change="onCurrentChange"
          :current-page="currentPage"
          :page-size="TABLE_PAGE_SIZE"
          layout="total, prev, pager, next"
          :total="tableCouponTotal"/>
      </div>
    </div>
    <uploaded-coupon-dialog
      :visible="showDialog"
      :coupons="uploadingCoupons"
      :total="totalCoupons"
      :message="upLoadResult"
      @close-dialog="onCloseDialog"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import { COUPON_LIST_THEAD, TABLE_PAGE_SIZE, REQUEST_SUCCESS, URL } from '../../utils/constant'
import UploadedCouponDialog from '../../components/coupon/UploadedCouponDialog'

const UPLOAD_DATA_DUPLICATE = '2002'
const ADD_UPLOAD_URL = URL + '/actCouponManage/addUpload'
const DELETE_UPLOAD_URL = URL + '/actCouponManage/deleteUpload'
const RECEIVE_STATUS = { 0: '可用', 1: '已被领取', 3: '已被删除' }

export default {
  components: { UploadedCouponDialog },
  data () {
    return {
      COUPON_LIST_THEAD,
      TABLE_PAGE_SIZE,
      ADD_UPLOAD_URL,
      DELETE_UPLOAD_URL,
      actid: '',
      aid: '',
      coupid: '',
      currentPage: 1,
      loadingCouponID: false,
      tableLoading: false,
      couponSearchForm: { couponCode: '' }, // 优惠券查询表单
      couponCode: '',                       // 优惠券码，保存查询时填写的优惠券码
      uploadedCoupons: [],        // 已上传的优惠券列表
      searchBtnLoading: false,    // 查询按钮loading
      isOnSearching: false,       // 查询标识，阻止分页组件在currenPage改变时触发
      uploadedCount: 0,           // 本优惠券上传的总优惠券数量
      receiveCount: 0,            // 已领取的优惠券总数
      tableCouponTotal: 0,        // 查询优惠券列表中优惠券数量
      addUploadBtnText: '请选择文件',
      removeUploadBtnText: '请选择文件',
      showDialog: false,       // 显示查询对话框标识
      addUploading: false,     // 批量增加上传loading标识
      removeUploading: false,  // 批量删除上传loading标识
      uploadingCoupons: [],    // 本次上传的优惠券列表
      totalCoupons: 0,         // 本次上传的优惠券总数(重复的优惠券/已删除的优惠券)
      upLoadResult: {
        type: 'success',
        desc: '优惠券上传成功',
        total: 0
      },
      ftpBtnLoading: false
    }
  },

  methods: {
    ...mapActions([
      'fetchCouponidByActid',
      'fetchCoupons',
      'uploadCouponsForAdd',
      'uploadCouponsForDelete',
      'transferCouponsToFtp'
    ]),

    onCouponSearch () {
      this.isOnSearching = true
      this.searchBtnLoading = true

      const { couponCode } = this.couponSearchForm
      this.currentPage = 1

      const params = {
        pageNum: this.currentPage,
        coupid: this.coupid
      }

      couponCode && (params.couponCode = couponCode)
      this.couponCode = couponCode

      this.loadCoupons(params)
    },

    onCurrentChange (currentPage) {
      // 搜索时改变了currentPage，导致请求了两次API，这里限制如果是查询
      // 在改变了currentPage时不请求API
      if (this.isOnSearching) {
        this.isOnSearching = false
        return
      }
      this.currentPage = currentPage

      const params = {
        pageNum: currentPage,
        coupid: this.coupid
      }
      // 如果输入的优惠码不为空
      this.couponCode && (params.couponCode = this.couponCode)

      this.loadCoupons(params)
    },

    onUploadForAdd (event) {
      let formdata = new FormData()
      formdata.append('file', event.file)
      formdata.append('coupid', this.coupid)

      this.addUploading = true
      this.addUploadBtnText = '上传中...'
      this.uploadCouponsForAdd(formdata).then(res => {
        this.addUploading = false
        this.addUploadBtnText = '请选择文件'

        const { code, list, uploadNums } = res
        if (code === UPLOAD_DATA_DUPLICATE) {
          this.showDialog = true
          this.totalCoupons = list.length

          this.$notify({
            title: '上传错误',
            message: `优惠券重复，共计${this.totalCoupons}条记录重复`,
            type: 'error',
            duration: 8000
          })

          this.uploadingCoupons = []
          list.forEach(item => {
            let coupon = {}
            coupon.coupid = item.code
            coupon.nums = item.nums
            this.uploadingCoupons.push(coupon)
          })

          this.$set(this.upLoadResult, 'type', 'error')
          this.$set(this.upLoadResult, 'desc', `你上传的优惠券重复了，共计${this.totalCoupons}条重复`)
        } else if (code === REQUEST_SUCCESS) {
          this.$notify({
            title: '上传成功',
            message: `上传成功，共计上传${uploadNums}条记录`,
            type: 'success',
            duration: 6000
          })

          // 上传成功后更新一下该优惠券列表
          this.currentPage = 1
          const coupid = this.coupid
          const pageNum = 1
          this.loadCoupons({ pageNum, coupid })
        }
      }).catch(err => {
        this.addUploading = false
        this.addUploadBtnText = '请选择文件'
        throw err
      })
    },

    onUploadForRemove (event) {
      let formdata = new FormData()
      formdata.append('file', event.file)
      formdata.append('coupid', this.coupid)

      this.removeUploading = true
      this.removeUploadBtnText = '上传中...'
      this.uploadCouponsForDelete(formdata).then(res => {
        this.removeUploading = false
        this.removeUploadBtnText = '请选择文件'

        const { code, delNums, list } = res

        this.totalCoupons = delNums

        if (code === REQUEST_SUCCESS) {
          this.$notify({
            title: '批量删除成功',
            message: `批量删除成功，共计删除${delNums}条记录`,
            type: 'success',
            duration: 6000
          })

          if (delNums * 1 > 0) {
            this.showDialog = true
            this.uploadingCoupons = []
            list.forEach(item => {
              let coupon = {}
              coupon.coupid = item
              coupon.nums = 1  // 这里删除数量默认写死为1
              this.uploadingCoupons.push(coupon)
            })

            this.$set(this.upLoadResult, 'type', 'success')
            this.$set(this.upLoadResult, 'desc', `批量删除成功，共计删除${delNums}条记录`)
          }
        }

        // 上传成功后更新一下该优惠券列表
        this.currentPage = 1
        const coupid = this.coupid
        const pageNum = 1
        this.loadCoupons({ pageNum, coupid })
      }).catch(err => {
        this.removeUploading = false
        this.removeUploadBtnText = '请选择文件'
        throw err
      })
    },

    onDownloadDemoFile (event, type) {
      event.stopPropagation()

      switch (type) {
        case 'ADD':
          window.location.assign('http://139.199.250.162:80/upload/downFile/addExamplesFile.csv')
          break
        case 'DELETE':
          window.location.assign('http://139.199.250.162:80/upload/downFile/delExamplesFile.csv')
          break
        default:
      }
    },

    onCloseDialog (val) {
      this.showDialog = val
    },

    onTransferToFtp () {
      const coupid = this.coupid

      this.ftpBtnLoading = true
      this.transferCouponsToFtp({ coupid }).then(res => {
        this.ftpBtnLoading = false

        const { code, fileName } = res
        const h = this.$createElement
        const vnode = h('p', null, [
          h('div', { style: 'margin-bottom: 8px' }, '文件名 '),
          h('div', { style: 'color: teal; width: 400px;' }, fileName)
        ])
        if (code === REQUEST_SUCCESS) {
          this.$notify({
            title: 'ftp传输成功',
            message: vnode,
            type: 'success',
            duration: 0
          })
        }
      }).catch(err => {
        this.ftpBtnLoading = false
        throw err
      })
    },

    loadCouponidByActid () {
      const actid = this.actid

      this.loadingCouponID = true
      this.fetchCouponidByActid({ actid }).then(res => {
        this.loadingCouponID = false

        const { code, coupid } = res
        if (code === REQUEST_SUCCESS) {
          this.coupid = coupid
          const pageNum = 1
          this.loadCoupons({ pageNum, coupid })
        }
      }).catch(err => {
        this.loadingCouponID = false
        throw err
      })
    },

    loadCoupons (params) {
      this.tableLoading = true
      this.fetchCoupons(params || {}).then(res => {
        this.tableLoading = false
        this.isOnSearching = false // 搜索结束
        this.searchBtnLoading = false

        const { code, actCouponManages, total, allNum, receiveNum } = res
        this.uploadedCoupons = []
        if (code === REQUEST_SUCCESS) {
          actCouponManages.forEach(item => {
            let coupon = {}
            coupon = item
            coupon.receiveStatus = RECEIVE_STATUS[item.receiveStatus]
            coupon.receiveTime = item.receiveTime && moment(item.receiveTime).format('YYYY-MM-DD HH:mm:ss')
            this.uploadedCoupons.push(coupon)
          })
          this.tableCouponTotal = total || 0
          this.uploadedCount = allNum || 0
          console.log('this.uploadedCount = ', this.uploadedCount)
          this.receiveCount = receiveNum || 0
        }
      }).catch(err => {
        this.tableLoading = false
        this.searchBtnLoading = false
        this.isOnSearching = false

        throw err
      })
    }
  },
  created () {
    this.actid = this.$route.params.actid
    this.loadCouponidByActid()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.coupon-stats__box > div {
  display: inline-block;
  vertical-align: middle;
}

.form-inline {
  display: inline-block;
}

.upload-stat {
  margin-right: 20px;
  color: $main-font-color;
}

.upload-stat > span:nth-of-type(3) {
  margin-left: 20px;
}
.search-btn {
  margin-left: 20px;
}

.paginantion {
  margin: 20px;
  float: right;
}

.coupon-info {
  line-height: 35px;
}

.coupon-info > span:first-of-type {
  margin-right: 15px;
}

.upload {
  margin-top: 10px;
}

.upload:last-child {
  margin-top: 0px;
}

.upload-elem {
  margin: 5px 0;
  display: inline-block;
}

.upload-btn {
  display: inline-block;
}

.upload-desc {
  margin-right: 10px;
  display: inline-block;
}
.download-demo {
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
  color: $theme-color;
}

.coupon-input {
  width: 280px;
}

.ftp-btn {
  margin-right: 15px;
}
</style>
