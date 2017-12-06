
<template>
  <div>
    <el-form
      ref="couponPopupForm"
      label-width="100px"
      class="form-box"
      :model="couponPopupForm"
      :rules="rules"
    >
      <el-form-item prop="name" label="券名称">
        <el-input
          v-model="couponPopupForm.name"
          placeholder="请输入券名称"
          :maxlength="15"/>
      </el-form-item>
      <el-form-item prop="popText" label="弹窗文本">
        <el-input
          type="textarea"
          resize="none"
           placeholder="请输入弹窗文本"
          :autosize="{ minRows: 3, maxRows: 4 }"
          :maxlength="50"
          v-model="couponPopupForm.popText"/>
      </el-form-item>
      <el-form-item prop="lessText" label="不足文本">
        <el-input
          type="textarea"
          resize="none"
           placeholder="请输入不足文本"
          :autosize="{ minRows: 3, maxRows: 4 }"
          :maxlength="50"
          v-model="couponPopupForm.lessText"/>
      </el-form-item>
      <el-form-item prop="hasSubBtn" label="副按钮">
        <el-row>
          <el-col :span="4" style="text-align:left;">
            <el-switch on-text="有" off-text="无" v-model="showSubButton"></el-switch>
          </el-col>
        </el-row>
      </el-form-item>
      <div v-if="showSubButton">
        <el-form-item prop="actText" label="按钮文本">
          <el-input
            placeholder="请输入按钮文本"
            v-model="couponPopupForm.actText"
            :maxlength="4"/>
        </el-form-item>
        <el-form-item prop="actids" label="按钮动作">
          <el-input v-model="couponPopupForm.actids" placeholder="请输入按钮动作(以空格分开)"/>
          <el-button
            type="primary"
            class="btn-search__art"
            icon="search"
            :loading="searchBtnLoading"
            @click="onSearchBtnActs('couponPopupForm', 'actids')">查询</el-button>
        </el-form-item>
        <el-form-item
          prop="actName"
          label="动作名称"
          style="text-align:left;"
          v-if="showSearchResult"
        >
          <span>{{ actName }}</span>
        </el-form-item>
      </div>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="couponPopupForm.remark"/>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSavePredefine('couponPopupForm')" :loading="saveBtnLoading">保存</el-button>
        <el-button @click="onResetForm('couponPopupForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { REQUEST_SUCCESS, PREDEFINE_TYPE } from '../../utils/constant'

export default {
  props: {
    aid: { type: [String, Number] },
    forUpdate: { type: Boolean, default: false }, // 更新预定义标识
    showButton: { type: Boolean, default: false },
    couponPopup: {
      type: Object,
      default () {
        return {
          name: '',
          popText: '',
          lessText: '',
          showButton: '',
          actText: '',
          actids: '',
          remark: '',
          coupid: ''
        }
      }
    }
  },
  data () {
    const checkActidsInput = (rule, value, callback) => {
      const reg = new RegExp(/[\u4E00-\u9FA5]/g) // 不能输入汉字
      const result = value.match(reg)

      if (!value) {
        return callback(new Error('请输入按钮动作(以空格分开)'))
      } else if (result) {
        return callback(new Error('输入错误，只能输入非汉字字符'))
      }

      callback()
    }

    return {
      couponPopupForm: {
        name: '',
        popText: '',
        lessText: '',
        showButton: '',
        actText: '',
        actids: '',
        remark: '',
        coupid: ''
      },
      actName: '',
      showSubButton: this.showButton,   // 是否显示副按钮
      saveBtnLoading: false,
      searchBtnLoading: false,
      showSearchResult: false,
      rules: {
        name: [{ required: true, message: '请输入券名称', trigger: 'blur' }],
        popText: [{ required: true, message: '请输入弹窗文本', trigger: 'blur' }],
        lessText: [{ required: true, message: '请输入不足文本', trigger: 'blur' }],
        actText: [{ required: true, message: '请输入按钮文本', trigger: 'blur' }],
        actids: [{ required: true, validator: checkActidsInput, trigger: 'blur' }]
      }
    }
  },
  watch: {
    showButton (value) {
      this.showSubButton = value
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction',
      'findActsByIds'
    ]),
    onSavePredefine (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handlePredCouponPopupReq()
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onSearchBtnActs (formName, prop) {
      this.$refs[formName].validateField(prop, (errorMessage) => {
        if (errorMessage) {
          console.error('[ERROR]: ', errorMessage)
        } else {
          const actids = this.couponPopupForm.actids

          this.searchBtnLoading = true
          this.actName = ''
          this.findActsByIds({ actids }).then(res => {
            this.searchBtnLoading = false

            const { code, result } = res

            if (code === REQUEST_SUCCESS) {
              this.showSearchResult = true
              this.actName = result
            }
          }).catch(err => {
            this.searchBtnLoading = false
            throw err
          })
        }
      })
    },

    handlePredCouponPopupReq () {
      const { name, popText, lessText, remark } = this.couponPopupForm
      const type = PREDEFINE_TYPE.COUPON_POPUP.value
      const typeName = PREDEFINE_TYPE.COUPON_POPUP.name
      const showButton = this.showSubButton

      let params = {
        type,
        remark,
        content: { name, popText, lessText }
      }

      // 如果有副按钮
      if (showButton) {
        const { actText, actids } = this.couponPopupForm
        params.content.actText = actText
        params.content.actids = actids
        params.content.showButton = '1'
      } else {
        params.content.showButton = '0'
      }

      let request = null
      if (this.forUpdate) {
        const { coupid } = this.couponPopupForm
        params.aid = this.aid
        params.content.coupid = coupid

        request = this.updatePredefineAction
      } else {
        params.name = typeName
        request = this.addPredefineAction
      }

      this.saveBtnLoading = true
      request(params).then(res => {
        this.saveBtnLoading = false

        const { code, aid } = res
        if (code === REQUEST_SUCCESS) {
          this.$message({ showClose: true, message: `预定义优惠券弹窗保存成功，动作ID：${aid}`, type: 'success' })

          if (!this.forUpdate) {
            this.$router.push({
              name: 'PREDINE_UPDATE',
              params: { type },
              query: { aid }
            })
            this.$refs['couponPopupForm'].resetFields()
          }
        }
      }).catch(err => {
        this.saveBtnLoading = false
        throw err
      })
    }
  },
  created () {
    this.couponPopupForm = this.couponPopup
  }
}
</script>

<style lang="scss">
.form-box {
  width: 600px;
  text-align: right;
  margin-top: 20px;
}

.radio-box {
  text-align: left;
}

.upload-btn {
  display: inline-block;
}

.file-download,
.upload-amt,
.used-amt {
  margin: 0 10px;
}

.upload-stats {
  position: absolute;
  top: 0;
  left: 88px;
}

.btn-search__art {
  position: absolute;
  right:-98px;
  top:0;
}

.el-icon-close-tip {
  display: none;
}

</style>
