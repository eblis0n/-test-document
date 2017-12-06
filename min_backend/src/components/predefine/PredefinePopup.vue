
<template>
  <div>
    <el-form
      ref="popupForm"
      label-width="100px"
      class="form-box"
      :model="popupForm"
      :rules="rules"
    >
      <el-form-item prop="title" label="弹窗标题">
        <el-input
          v-model="popupForm.title"
          placeholder="请输入弹窗标题"
          :maxlength="15"/>
      </el-form-item>
      <el-form-item prop="text" label="弹窗文本">
        <el-input
          type="textarea"
          resize="none"
          placeholder="请输入弹窗文本"
          :maxlength="15"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="popupForm.text"/>
      </el-form-item>
      <el-form-item
        prop="subactid"
        label="按钮动作"
      >
        <el-input v-model="popupForm.subactid" placeholder="请输入动作ID，空格分隔"/>
        <el-button
          type="primary"
          class="btn-search__act"
          icon="search"
          @click="onSearchBtnActs('popupForm', 'subactid')" :loading="searchBtnLoading">查询</el-button>
      </el-form-item>
      <el-form-item
        label="动作名称"
        style="text-align:left;"
        v-if="showSearchResult"
      >
        <span>{{ actionName }}</span>
      </el-form-item>
      <el-form-item prop="buttontext" label="按钮文本">
        <el-input
          v-model="popupForm.buttontext"
          :maxlength="4"
          placeholder="请输入按钮文本"/>
      </el-form-item>
      <el-row>
        <el-col :span="3" style="text-align:left;">
          <el-form-item
            label="关闭按钮"
          >
            <el-switch on-text="有" off-text="无" v-model="newIsclosepermit"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="21">
          <el-form-item
            prop="closeText"
            label=""
            :rules="newIsclosepermit ? [{ required: true, message: '请输入关闭按钮文本', trigger: 'blur' }] : []"
            v-if="newIsclosepermit"
          >
            <el-input
              placeholder="请输入关闭按钮文本"
              :maxlength="4"
              v-model="popupForm.closeText"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="popupForm.remark"/>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSavePredPopup('popupForm')" :loading="addLoading">保存</el-button>
        <el-button @click="onResetForm('popupForm')">重置</el-button>
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
    forUpdate: { type: Boolean, default: false },
    isclosepermit: { type: Boolean, default: false },
    popupWindow: {
      type: Object,
      default () {
        return {
          title: '',
          text: '',
          buttontext: '',
          subactid: '',
          isclosepermit: false,
          closeText: '',
          remark: ''
        }
      }
    }
  },
  data () {
    const checkAidInput = (rule, value, callback) => {
      const reg = new RegExp(/[\u4E00-\u9FA5]/g) // 限制不能输入汉字
      const result = value.match(reg)

      if (!value) {
        return callback(new Error('请输入请输入动作ID，空格分隔'))
      } else if (result) {
        return callback(new Error('输入错误，请输入非汉字字符'))
      }

      callback()
    }

    return {
      popupForm: {
        title: '',
        text: '',
        subactid: '',
        buttontext: '',
        closeText: '',
        isclosepermit: false,
        remark: ''
      },
      actionName: '',
      newIsclosepermit: this.isclosepermit,
      addLoading: false,
      searchBtnLoading: false,
      showSearchResult: false,
      rules: {
        title: [{ required: true, message: '请输入弹窗标题', trigger: 'blur' }],
        subactid: [{ validator: checkAidInput, trigger: 'blur', required: true }],
        text: [{ required: true, message: '弹窗文本', trigger: 'blur' }],
        buttontext: [{ required: true, message: '请输入按钮文本', trigger: 'blur' }]
      }
    }
  },
  watch: {
    isclosepermit (value) {
      this.newIsclosepermit = value
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction',
      'findActsByIds'
    ]),

    onSavePredPopup (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handlePredPopupRequest()
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
          const actids = this.popupForm.subactid

          this.searchBtnLoading = true
          this.actionName = ''
          this.findActsByIds({ actids }).then(res => {
            this.searchBtnLoading = false

            const { code, result } = res

            if (code === REQUEST_SUCCESS) {
              this.showSearchResult = true
              this.actionName = result
            }
          }).catch(err => {
            this.searchBtnLoading = false
            throw err
          })
        }
      })
    },

    handlePredPopupRequest () {
      const { title, text, buttontext, subactid, remark } = this.popupForm
      const isclosepermit = this.newIsclosepermit
      const type = PREDEFINE_TYPE.POPUP_WINDOW.value
      const name = PREDEFINE_TYPE.POPUP_WINDOW.name

      let params = {
        type,
        content: { title, text, buttontext, subactid },
        remark
      }

      params.content.isclosepermit = isclosepermit ? '1' : '0'

      if (isclosepermit) {
        params.content.closeText = this.popupForm.closeText
      }

      let request
      if (this.forUpdate) {
        params.aid = this.aid
        request = this.updatePredefineAction
      } else {
        params.name = name
        request = this.addPredefineAction
      }

      this.addLoading = true
      request(params).then(res => {
        this.addLoading = false

        const { code, aid } = res
        if (code === REQUEST_SUCCESS) {
          this.$message({ showClose: true, message: `弹窗设置保存成功，动作ID：${aid}~`, type: 'success' })

          if (!this.forUpdate) {
            this.$router.push({
              name: 'PREDINE_UPDATE',
              params: { type },
              query: { aid }
            })
            this.$refs['popupForm'].resetFields()
          }
        }
      }).catch(err => {
        this.addLoading = false
        throw err
      })
    }
  },
  created () {
    this.popupForm = this.popupWindow
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

.btn-search__act {
  position: absolute;
  right:-98px;
  top:0;
}
</style>
