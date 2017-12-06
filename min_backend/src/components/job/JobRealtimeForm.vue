
<template>
  <div>
    <el-form
      ref="jobParamForm"
      label-width="118px"
      class="form-box"
      :model="jobParamForm"
      :rules="rules"
    >
      <template v-for="(param, index) in jobParamForm.params">
        <el-row>
          <el-col :span="11">
            <el-form-item
              :prop="'params.' + index + '.variable'"
              :label="'条件' + (index + 1)"
              :rules="[{ required: true, message: '请选择变量', trigger: 'change' }]"
            >
              <el-select v-model="param.variable" placeholder="请选择变量">
                <el-option label="支付宝支付次数" value="homepg_status"></el-option>
                <el-option label="微信支付次数" value="homepg_status"></el-option>
                <el-option label="是否已关注公众号" value="homepg_status"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item
              label-width="5px"
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
          </el-col>
          <el-col :span="6">
            <el-form-item
              label-width="5px"
              :prop="'params.' + index + '.value'"
              :rules="[{ required: true, message: '请输入值', trigger: 'blur' }]"
            >
              <el-input v-model="param.value" placeholder="请输入值" class="input-msg-title"/>
              <fa-icon class="fa-minus-circle icon-add reduce-icon" @click="onReduceParam(index)"/>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-form-item label="增加监听条件">
        <fa-icon class="fa-plus-circle icon-add" @click="onAddJobParam"/>
      </el-form-item>
      <el-form-item label="生效/失效时间" prop="timeRange" :error="timeInputError">
        <el-date-picker
          v-model="jobParamForm.timeRange"
          type="datetimerange"
          placeholder="请选择生效/失效时间">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <job-form @save-job="onSaveJob"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FaIcon from '../commons/FaIcon.vue'
import JobForm from './JobForm'
// import { REQUEST_SUCCESS } from '../../utils/constant'

export default {
  components: { FaIcon, JobForm },
  data () {
    return {
      jobParamForm: {
        params: [],
        timeRange: []
      },
      rules: {
        timeRange: [{ type: 'array', required: true, message: '请输入选择生效/失效时间', trigger: 'blur' }]
      },
      timeInputError: ''
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction',
      'findActsByIds'
    ]),
    onSaveJob ({ jobFormData, type }) {
      this.$refs['jobParamForm'].validate((valid) => {
        if (valid) {
          const timeRange = this.jobParamForm.timeRange

          // 选择时间范围时，如果用户点击了该组件'x'按钮，timeRange变为[null, null]
          // 过滤器没有判断它为空，所以这里要手动判断
          if (!timeRange[0] || !timeRange[1]) {
            this.timeInputError = '请输入选择生效/失效时间'
            this.$set(this.jobParamForm, 'timeRange', [])
            return false
          }

          this.handleSaveJobReq()
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onAddJobParam () {
      const param = { variable: '', mode: '', value: '' }
      this.jobParamForm.params.push(param)
    },

    onReduceParam (index) {
      this.jobParamForm.params.splice(index, 1)
    },

    handleSaveJobReq () {
      console.log('request api')
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.form-box {
  width: 608px;
  text-align: left;
  margin-top: 20px;
}

.date-picker {
  width: 100%;
}

.form-btn {
  text-align: center;
}

.icon-add {
  font-size: 22px;
  vertical-align: middle;
  color: rgba(0, 115, 181, 1);
  transition: all 0.6s;
}

.icon-add:active {
  color: rgba(0, 115, 181, 0.65);
  transition: all 0.6s;
}

.reduce-icon {
  position: absolute;
  top: 50%;
  right: -40px;
  transform: translateY(-50%);
  color: #ff4949;
  transition: all 0.5s;
}

.reduce-icon:active {
  color: #b10000;
  transition: all 0.5s;
}

</style>
