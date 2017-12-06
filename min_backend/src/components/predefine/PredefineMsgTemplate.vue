<template>
  <div class="">
    <el-form
      ref="msgTemplateForm"
      label-width="120px"
      class="form-box"
      :model="msgTemplateForm"
      :rules="rules"
    >
      <el-form-item prop="bid" label="模板消息编号">
        <el-input
          v-model="msgTemplateForm.bid"
          placeholder="请输入模板消息编号(只能输入数字)"
          @change="onInputMsgTemplate"/>
        <el-button
          type="primary"
          class="btn-search__art"
          icon="search"
          :loading="searchBtnLoading"
          @click="onSearchMsgTemplate('msgTemplateForm', 'bid')">查询</el-button>
      </el-form-item>
      <el-form-item
        label="模板名称"
        style="text-align:left;"
        v-if="showSearchResult"
      >
        <span>{{ msgTempName }}</span>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="msgTemplateForm.remark"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSaveMsgTemplate('msgTemplateForm')"
          :loading="btnLoading">保存</el-button>
        <el-button @click="onResetForm('msgTemplateForm')">重置</el-button>
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
    msgTemplate: {
      type: Object,
      default () {
        return { bid: '', remark: '' }
      }
    }
  },
  data () {
    const checkInput = (rule, value, callback) => {
      value = value + ''
      const reg = new RegExp(/\D/g)
      const result = value.match(reg)

      if (!value) {
        return callback(new Error('请输入模板消息编号'))
      } else if (result) {
        return callback(new Error('输入错误，只能输入数字'))
      }

      callback()
    }

    return {
      msgTemplateForm: { bid: '', remark: '' },
      msgTempName: '',
      btnLoading: false,
      searchBtnLoading: false,
      showSearchResult: false,
      rules: {
        bid: [{ validator: checkInput, trigger: 'blur', required: true }]
      }
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction',
      'findTempById'
    ]),

    onSaveMsgTemplate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleMsgTemplateRequest()
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onSearchMsgTemplate (formName, prop) {
      this.$refs[formName].validateField(prop, (errorMessage) => {
        if (errorMessage) {
          console.error('[ERROR]: ', errorMessage)
        } else {
          const bid = this.msgTemplateForm.bid

          this.searchBtnLoading = true
          this.msgTempName = ''
          this.findTempById({ bid }).then(res => {
            this.searchBtnLoading = false

            const { code, result } = res
            if (code === REQUEST_SUCCESS) {
              this.showSearchResult = true
              this.msgTempName = result
            }
          }).catch(err => {
            this.searchBtnLoading = false
            throw err
          })
        }
      })
    },

    onInputMsgTemplate (value) {
      this.$refs['msgTemplateForm'].validate((valid) => {
        if (!valid) {
          return false
        }
      })
    },

    handleMsgTemplateRequest () {
      const { bid, remark } = this.msgTemplateForm
      const content = { bid }
      const type = PREDEFINE_TYPE.TEMPLATE_MSG.value

      let params = { type, remark, content }

      let request
      if (this.forUpdate) {
        params.aid = this.aid
        request = this.updatePredefineAction
      } else {
        params.name = PREDEFINE_TYPE.TEMPLATE_MSG.name
        request = this.addPredefineAction
      }

      this.btnLoading = true
      request(params).then(res => {
        this.btnLoading = false

        const { code, aid } = res
        if (code === REQUEST_SUCCESS) {
          this.$message({ showClose: true, message: `预定义模板消息保存成功, 动作ID：${aid}`, type: 'success' })
          if (!this.forUpdate) {
            this.$router.push({
              name: 'PREDINE_UPDATE',
              params: { type },
              query: { aid }
            })
            this.$refs['msgTemplateForm'].resetFields()
          }
        }
      }).catch(err => {
        this.btnLoading = false

        throw err
      })
    }
  },
  created () {
    this.msgTemplateForm = this.msgTemplate
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  width: 600px;
  text-align: right;
  margin-top: 20px;
}
.btn-search__art {
  position: absolute;
  right:-98px;
  top:0;
}
</style>
