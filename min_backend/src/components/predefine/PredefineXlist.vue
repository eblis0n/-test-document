
<template>
  <div>
    <el-form
      ref="xlistForm"
      label-width="120px"
      class="form-box"
      :model="xlistForm"
      :rules="rules"
    >
      <el-form-item prop="xid" label="Xlist">
        <el-input
          placeholder="请输入Xlist"
          v-model="xlistForm.xid"
          @change="onInputXlist"/>
        <el-button
          type="primary"
          class="btn-search__art"
          icon="search"
          :loading="searchBtnLoading"
          @click="onSearchXlistInfo('xlistForm', 'xid')">查询</el-button>
      </el-form-item>
      <el-form-item
        label="信息流名称"
        style="text-align:left;"
        v-if="showSearchResult"
      >
        <span>{{ xlistInfoName }}</span>
      </el-form-item>
      <el-form-item label="Xlist类型" class="radio-box" prop="ismove">
        <el-radio-group v-model="xlistForm.ismove" size="medium">
          <el-radio-button label="1">移入</el-radio-button>
          <el-radio-button label="0">移除</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="xlistForm.remark"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="saveBtnLoading"
          @click="onSaveXlistAct('xlistForm')">保存</el-button>
        <el-button @click="onResetForm('xlistForm')">重置</el-button>
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
    xlist: {
      type: Object,
      default () {
        return { xid: '', ismove: '', remark: '' }
      }
    }
  },
  data () {
    const checkXlistInput = (rule, value, callback) => {
      const reg = new RegExp(/[^\w&=]|_/ig)
      const result = value.match(reg)

      if (!value) {
        return callback(new Error('请输入Xlist'))
      } else if (result) {
        return callback(new Error('输入错误，只能输入英文或数字'))
      }

      callback()
    }

    return {
      xlistForm: { xid: '', ismove: '', remark: '' },
      xlistInfoName: '',
      saveBtnLoading: false,
      searchBtnLoading: false,
      showSearchResult: false,
      rules: {
        xid: [{ validator: checkXlistInput, trigger: 'blur', required: true }],
        ismove: [{ required: true, message: '请选择Xlist类型', trigger: 'change' }]
      }
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction',
      'findXlistById'
    ]),

    onSaveXlistAct (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleXlistRequest()
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onSearchXlistInfo (formName, prop) {
      this.$refs[formName].validateField(prop, (errorMessage) => {
        if (errorMessage) {
          console.error('[ERROR]: ', errorMessage)
        } else {
          const rid = this.xlistForm.xid

          this.searchBtnLoading = true
          this.xlistInfoName = ''
          this.findXlistById({ rid }).then(res => {
            this.searchBtnLoading = false

            const { code, result } = res
            if (code === REQUEST_SUCCESS) {
              this.showSearchResult = true
              this.xlistInfoName = result
            }
          }).catch(err => {
            this.searchBtnLoading = false
            throw err
          })
        }
      })
    },

    onInputXlist (value) {
      this.$refs['xlistForm'].validate((valid) => {
        if (!valid) {
          return false
        }
      })
    },

    handleXlistRequest () {
      const { xid, ismove, remark } = this.xlistForm
      const type = PREDEFINE_TYPE.XLIST.value
      const name = PREDEFINE_TYPE.XLIST.name

      let params = {
        type,
        content: { xid, ismove, remark },
        remark
      }

      let request
      if (this.forUpdate) {
        params.aid = this.aid
        request = this.updatePredefineAction
      } else {
        params.name = name
        request = this.addPredefineAction
      }

      this.saveBtnLoading = true
      request(params).then(res => {
        this.saveBtnLoading = false

        const { code, aid } = res
        if (code === REQUEST_SUCCESS) {
          this.$message({ showClose: true, message: `预定义Xlist保存成功，动作ID: ${aid}`, type: 'success' })
          if (!this.forUpdate) {
            this.$router.push({
              name: 'PREDINE_UPDATE',
              params: { type },
              query: { aid }
            })
            this.$refs['xlistForm'].resetFields()
          }
        }
      }).catch(err => {
        this.saveBtnLoading = false
        throw err
      })
    }
  },
  created () {
    this.xlistForm = this.xlist
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  width: 600px;
  text-align: right;
  margin-top: 20px;
}

.radio-box {
  text-align: left;
}

.btn-search__art {
  position: absolute;
  right:-98px;
  top:0;
}
</style>
