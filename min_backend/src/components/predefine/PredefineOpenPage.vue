<template>
  <div>
    <el-form
      ref="pagePathForm"
      label-width="120px"
      class="form-box"
      :model="pagePathForm"
      :rules="rules"
    >
      <el-form-item
        prop="url"
        label="页面路径"
      >
        <el-input v-model="pagePathForm.url" placeholder="请输入小程序路径"/>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="pagePathForm.remark"/>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onAddPredOpenPage('pagePathForm')" :loading="addLoading">保存</el-button>
        <el-button @click="onResetForm('pagePathForm')">重置</el-button>
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
    page: {
      type: Object,
      default () {
        return { url: '', remark: '' }
      }
    }
  },
  data () {
    const checkInput = (rule, value, callback) => {
      const reg = new RegExp(/[\u4E00-\u9FA5]/g)
      const result = value.match(reg)

      if (!value) {
        return callback(new Error('请输入小程序路径'))
      } else if (result) {
        return callback(new Error('输入页面路径错误'))
      }

      callback()
    }

    return {
      pagePathForm: { url: '', remark: '' },
      addLoading: false,
      rules: {
        url: [{ required: true, validator: checkInput, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction'
    ]),

    onAddPredOpenPage (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handlePredOpenPageReq()
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    handlePredOpenPageReq () {
      const { url, remark } = this.pagePathForm
      const type = PREDEFINE_TYPE.OPEN_PAGE.value

      let params = {
        type,
        content: { url, remark },
        remark
      }

      let request
      if (this.forUpdate) {
        params.aid = this.aid
        request = this.updatePredefineAction
      } else {
        params.name = '打开页面'
        request = this.addPredefineAction
      }

      this.addLoading = true
      request(params).then(res => {
        this.addLoading = false

        const { code, aid } = res
        if (code === REQUEST_SUCCESS) {
          this.$message({ showClose: true, message: `预定义打开页面保存成功，动作ID: ${aid}`, type: 'success' })

          if (!this.forUpdate) {
            this.$router.push({
              name: 'PREDINE_UPDATE',
              params: { type },
              query: { aid }
            })
            this.$refs['pagePathForm'].resetFields()
          }
        }
      }).catch(err => {
        this.addLoading = false
        throw err
      })
    }
  },
  created () {
    this.pagePathForm = this.page
  }
}
</script>

<style lang="scss">
.form-box {
  width: 600px;
  text-align: right;
  margin-top: 20px;
}
</style>
