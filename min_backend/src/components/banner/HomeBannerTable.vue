<template>
  <el-row class="home-banner" v-loading="loading">
    <el-table :data="homeBannerList" border stripe>
      <el-table-column prop="imgDate" label="日期" width="156"/>
      <el-table-column prop="uploadName" label="上传图片文件名"/>
      <el-table-column prop="imgUrl" label="操作" width="202">
        <template slot-scope="scope">
          <template v-if="scope.row.imgUrl">
            <el-button
              size="small"
              type="info"
              @click="openPhotoSwipe(scope.$index)"><fa-icon class="fa-eye"/>预览</el-button>
            <el-upload
              class="update-upload"
              :action="DEDIT_UPLOAD_URL"
              :show-file-list="false"
              :http-request="onUploadforUpdate"
              :disabled="updateLoading === scope.$index"
            >
              <el-button
                size="small"
                type="primary"
                :loading="updateLoading === scope.$index"
                @click="onChooseFile(scope.$index)"
              >
                <fa-icon class="fa-upload" v-if="updateLoading !== scope.$index"/>修改
              </el-button>
            </el-upload>
          </template>
          <template v-else>
            <el-upload
              :action="ADD_UPLOAD_URL"
              :show-file-list="false"
              :http-request="onUploadForAdd"
              :disabled="addUploadLoading === scope.$index"
            >
              <el-button
                size="small"
                type="primary"
                :loading="addUploadLoading === scope.$index"
                @click="onChooseFile(scope.$index)"
              >
                <fa-icon class="fa-upload" v-if="addUploadLoading !== scope.$index"/>点击上传
              </el-button>
            </el-upload>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <image-preview ref="pswp"></image-preview>
  </el-row>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe.js'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.js'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

import { mapActions } from 'vuex'
import moment from 'moment'
import ImagePreview from './ImagePreview'
import FaIcon from '../commons/FaIcon'
import { URL, REQUEST_SUCCESS } from '../../utils/constant'

const ADD_UPLOAD_URL = URL + '/bannerVue/addUpload'
const DEDIT_UPLOAD_URL = URL + '/bannerVue/updateUpload'

export default {
  components: { ImagePreview, FaIcon },
  props: {
    month: { type: Number, required: true },
    year: { type: Number, required: true }
  },
  data () {
    return {
      ADD_UPLOAD_URL,
      DEDIT_UPLOAD_URL,
      imgIndex: 0,           // 预览图片时，当前图片的序号
      currentIndex: 0,       // 表格中当前操作的下标
      gallery: null,         // 图片查看器
      updateLoading: -1,     // 修改图片上传时loading标识
      addUploadLoading: -1,   // 添加图片上传时loading标识,
      homeBanners: [],
      loading: false
    }
  },
  computed: {
    homeBannerList () {
      return this.homeBanners
    },
    bannerImgs () {
      let banners = []
      this.homeBanners.forEach(item => {
        if (item.imgUrl) {
          banners.push({
            src: item.imgUrl,
            w: 750,
            h: 684,
            title: item.imgDate
          })
        }
      })

      return banners
    }
  },
  watch: {
    year () {
      this.loadHomeBanners()
    }
  },
  methods: {
    ...mapActions([
      'fetchBannerList',
      'bannerUpdateUpload',
      'bannerAddUpload'
    ]),

    openPhotoSwipe (index) {
      const pswpElement = this.$refs.pswp.$el

      // 获取本行之前的行是否有些行没有图片数量
      let offset = 0
      for (let i = index; i >= 0; i--) {
        !this.homeBannerList[i].imgUrl && ++offset
      }

      this.imgIndex = index - offset
      const options = {
        shareButtons: [
          { id: 'download', label: '下载这张图片', url: '{{raw_image_url}}', download: true }
        ],
        bgOpacity: 0.8,
        index: this.imgIndex // 因为从0开始计数
      }

      this.gallery = null
      this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, this.bannerImgs, options)
      this.gallery.init()
    },

    onChooseFile (rowIndex) {
      // 获取当前操作的行，用于激活上传文件时的loading标识
      this.currentIndex = rowIndex
    },

    onUploadforUpdate (event) {
      const file = event.file
      const formData = this.formatUploadFile(file)

      this.updateLoading = this.currentIndex
      this.bannerUpdateUpload(formData).then(res => {
        const { code } = res
        if (code === REQUEST_SUCCESS) {
          this.$message({ showClose: true, message: `文件${file.name}上传成功`, type: 'success' })

          // 上传成功后更新这行的图片
          const { uploadName, imgUrl } = res
          let row = this.homeBanners[this.currentIndex]
          row.imgUrl = imgUrl
          row.uploadName = uploadName
          this.$set(this.homeBanners, this.currentIndex, row)
        }
      }).catch(err => {
        this.$message({ showClose: true, message: `文件${file.name}上传失败，请重新上传`, type: 'error' })
        throw err
      }).finally(() => {
        this.updateLoading = -1
      })
    },

    onUploadForAdd (event) {
      const file = event.file
      const formData = this.formatUploadFile(file)

      this.addUploadLoading = this.currentIndex
      this.bannerAddUpload(formData).then(res => {
        const { code } = res
        if (code === REQUEST_SUCCESS) {
          this.$message({ showClose: true, message: `文件${file.name}上传成功`, type: 'success' })

          const { uploadName, imgUrl } = res
          let row = this.homeBanners[this.currentIndex]
          row.imgUrl = imgUrl
          row.uploadName = uploadName
          this.$set(this.homeBanners, this.currentIndex, row)
        }
      }).catch(err => {
        this.$message({ showClose: true, message: `文件${file.name}上传失败，请重新上传`, type: 'error' })
        throw err
      }).finally(() => {
        this.addUploadLoading = -1
      })
    },

    formatUploadFile (file) {
      if (!file) return

      const year = this.year + ''
      const month = this.month < 10 ? ('0' + this.month) : (this.month + '')
      let day = this.currentIndex + 1
      day = day < 10 ? ('0' + day) : (day + '')

      let formData = new FormData()
      formData.append('file', file)
      formData.append('imgDate', year + month + day)

      return formData
    },

    loadHomeBanners () {
      this.homeBanners = []

      const year = this.year
      const month = this.month

      this.loading = true
      this.fetchBannerList({ year, month }).then(res => {
        const { code } = res
        if (code === REQUEST_SUCCESS) {
          const { list } = res
          list.forEach(item => {
            let img = item
            img.imgDate = moment(item.imgDate).format('YYYY年MM月DD日')
            this.homeBanners.push(img)
          })
        }
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.loadHomeBanners()
  },
  destroyed () {
    this.gallery && (this.gallery = null)
  }
}
</script>

<style lang="scss" scoped>
.home-banner {
  width: 788px;
  max-width: 808px;
}
.update-upload {
  display: inline-block;
}
</style>
