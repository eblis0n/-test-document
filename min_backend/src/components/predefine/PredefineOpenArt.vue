<template>
  <div>
    <el-form
      ref="predArtOpenForm"
      label-width="120px"
      class="form-box"
      :model="predArtOpenForm"
      :rules="rules"
    >
      <el-form-item
        prop="articleid"
        label="文章ID"
      >
        <el-input v-model="predArtOpenForm.articleid" placeholder="请输入文章ID"/>
        <el-button
          type="primary"
          class="btn-search__art"
          icon="search"
          :loading="searchBtnLoading"
          @click="onSearchArtID('predArtOpenForm', 'articleid')">查询</el-button>
      </el-form-item>
      <el-form-item
        label="文章名称"
        style="text-align:left;"
        v-if="showSearchResult"
      >
        <span>{{ articleName }}</span>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="predArtOpenForm.remark"/>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSavePredOpenArt('predArtOpenForm')" :loading="addLoading">保存</el-button>
        <el-button @click="onResetForm('predArtOpenForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { REQUEST_SUCCESS, PREDEFINE_TYPE } from '../../utils/constant'

const checkArtIDInput = (rule, value, callback) => {
  const reg = new RegExp(/[^\w&=]|_/ig)
  const result = value.match(reg)

  if (!value) {
    return callback(new Error('请输入文章ID'))
  } else if (result) {
    return callback(new Error('输入错误，只能输入英文或数字'))
  }

  callback()
}

export default {
  props: {
    aid: { type: [String, Number] },
    forUpdate: { type: Boolean, default: false },
    artOpen: {
      type: Object,
      default () {
        return { articleid: '', remark: '' }
      }
    }
  },
  data () {
    return {
      predArtOpenForm: { articleid: '', remark: '' },
      addLoading: false,
      searchBtnLoading: false,
      showSearchResult: false,
      articleName: '',
      rules: {
        articleid: [{ validator: checkArtIDInput, trigger: 'blur', required: true }]
      }
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction',
      'findArticleById'
    ]),

    onSavePredOpenArt (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handlePredOpenArtReq()
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onSearchArtID (formName, prop) {
      this.$refs[formName].validateField(prop, (errorMessage) => {
        if (errorMessage) {
          console.error('[ERROR]: ', errorMessage)
        } else {
          const cid = this.predArtOpenForm.articleid

          this.searchBtnLoading = true
          this.articleName = ''
          this.findArticleById({ cid }).then(res => {
            this.searchBtnLoading = false

            const { code, result } = res
            if (code === REQUEST_SUCCESS) {
              this.showSearchResult = true
              this.articleName = result
            }
          }).catch(err => {
            this.searchBtnLoading = false
            throw err
          })
        }
      })
    },

    handlePredOpenArtReq () {
      const { remark, articleid } = this.predArtOpenForm
      const type = PREDEFINE_TYPE.OPEN_ARTICLE.value

      let params = {
        type,
        content: { articleid, remark },
        remark
      }

      let request
      if (this.forUpdate) {
        params.aid = this.aid
        request = this.updatePredefineAction
      } else {
        params.name = '打开文章'
        request = this.addPredefineAction
      }

      this.addLoading = true
      request(params).then(res => {
        this.addLoading = false

        const { code, aid } = res

        if (code === REQUEST_SUCCESS) {
          !this.forUpdate && this.$refs['predArtOpenForm'].resetFields()
          this.$message({ showClose: true, message: `预定义打开文章成功，动作ID: ${aid}`, type: 'success' })
        }
      }).catch(err => {
        this.addLoading = false
        throw err
      })
    }
  },
  created () {
    this.predArtOpenForm = this.artOpen
  }
}
</script>

<style lang="scss">
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
