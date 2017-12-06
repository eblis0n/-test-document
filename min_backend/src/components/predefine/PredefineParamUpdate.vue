
<template>
  <div>
    <el-form
      ref="paramUpdateForm"
      label-width="100px"
      class="form-box"
      :inline="true"
      :model="paramUpdateForm"
    >
      <template v-for="(param, index) in paramUpdateForm.params">
        <el-form-item
          :prop="'params.' + index + '.variable'"
          :label="'参数' + (index + 1)"
          :rules="[{ required: true, message: '请选择变量', trigger: 'change' }]"
        >
          <el-select v-model="param.variable" placeholder="请选择变量">
            <el-option label="首页状态变量" value="homepg_status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :prop="'params.' + index + '.mode'"
          :rules="[{ required: true, message: '请选择更新方式', trigger: 'change' }]"
        >
          <el-select v-model="param.mode" placeholder="请选择更新方式" >
            <el-option label="增加+" value="add+"></el-option>
            <el-option label="减少-" value="cut-"></el-option>
            <el-option label="更新至=" value="updateto="></el-option>
            <el-option label="文本增加" value="addtext"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :prop="'params.' + index + '.value'"
          :rules="[{ required: true, message: '请输入值', trigger: 'blur' }]"
        >
          <el-input v-model="param.value" placeholder="请输入值" class="input-msg-title"/>
          <fa-icon class="fa-plus-circle icon-add" id="ADD_PARAM" @click="onAddParam" v-if="param.showAddBtn"/>
          <fa-icon class="fa-minus-circle icon-add" id="REDUCE_PARAM" @click="onReduceParam" v-if="param.showReduceBtn"/>
        </el-form-item>
      </template>
      <el-form-item label="备注信息" prop="remark" class="form-item__remark">
        <el-input
          type="textarea"
          resize="none"
          class="input-remark"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="paramUpdateForm.remark"/>
      </el-form-item>
      <el-form-item class="form-item__bottom">
        <el-button
          type="primary"
          :loading="btnLoading"
          @click="onSavePredParamUpdate('paramUpdateForm')">保存</el-button>
        <el-button @click="onResetForm('paramUpdateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FaIcon from '../../components/commons/FaIcon'
import { mapActions } from 'vuex'
import { REQUEST_SUCCESS, PREDEFINE_TYPE } from '../../utils/constant'

export default {
  components: { FaIcon },
  props: {
    aid: { type: [String, Number] },
    forUpdate: { type: Boolean, default: false },
    updateParams: {
      type: Object,
      default () {
        return {
          params: [{
            variable: '',
            mode: '',
            value: '',
            showAddBtn: true,
            showReduceBtn: false
          }],
          remark: ''
        }
      }
    }
  },
  data () {
    return {
      paramUpdateForm: {
        params: [{
          variable: '',
          mode: '',
          value: '',
          showAddBtn: true,       // 是否显示“增加参数按钮”
          showReduceBtn: false    // 是否显示“减少参数按钮”
        }],
        remark: ''
      },
      btnLoading: false
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction'
    ]),
    onSavePredParamUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleParamUpdateReq()
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onAddParam (event) {
      const length = this.paramUpdateForm.params.length
      this.paramUpdateForm.params[length - 1].showAddBtn = false
      this.paramUpdateForm.params[length - 1].showReduceBtn = false
      this.paramUpdateForm.params.push({ variable: '', mode: '', value: '', showAddBtn: true, showReduceBtn: true })
    },

    onReduceParam (event) {
      const length = this.paramUpdateForm.params.length
      if (length <= 1) return

      this.paramUpdateForm.params.pop()

      // 保持最后一个元素显示加减按钮，因为上面pop一个元素，所以这里减2
      this.paramUpdateForm.params[length - 2].showAddBtn = true
      this.paramUpdateForm.params[length - 2].showReduceBtn = !(length <= 2)
    },

    handleParamUpdateReq () {
      const { params, remark } = this.paramUpdateForm

      let content = []
      params.forEach(item => {
        const { variable, mode, value } = item
        content.push({ variable, mode, value })
      })

      const type = PREDEFINE_TYPE.PARAM_UPDATE.value
      const name = PREDEFINE_TYPE.PARAM_UPDATE.name

      let reqParams = { type, content, remark }

      let request = null
      if (this.forUpdate) {
        reqParams.aid = this.aid
        request = this.updatePredefineAction
      } else {
        reqParams.name = name
        request = this.addPredefineAction
      }

      this.btnLoading = true
      request(reqParams).then(res => {
        this.btnLoading = false

        const { code, aid } = res
        if (code === REQUEST_SUCCESS) {
          this.$message({ showClose: true, message: `预定义参数更新保存成功, 动作ID：${aid}`, type: 'success' })

          if (!this.forUpdate) {
            this.$router.push({
              name: 'PREDINE_UPDATE',
              params: { type },
              query: { aid }
            })
            this.$refs['paramUpdateForm'].resetFields()
          }
        }
      }).catch(err => {
        this.btnLoading = false
        throw err
      })
    }
  },
  created () {
    this.paramUpdateForm = this.updateParams
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  width: 862px;
  text-align: left;
  margin-top: 20px;
}

.form-item__bottom {
  text-align: center;
  width: 100%;
}

.form-item__remark {
  display: block;
}

.input-remark {
    width: 640px;
}

.input-msg-title {
  width: 188px;
}

.radio-box {
  text-align: left;
}

.icon-add {
  font-size: 22px;
  margin-left: 12px;
  vertical-align: middle;
  color: #bfcdd9;
  transition: all 0.6s;
}
.icon-add:hover {
  color: rgba(0, 115, 181, 1);
  transition: all 0.6s;
}
.icon-add:active {
  color: rgba(0, 115, 181, 0.65);
  transition: all 0.6s;
}
.icon-add:nth-of-type(2) {
  margin-left: 0;
}
</style>
