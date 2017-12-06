
<template>
  <div>
    <el-form
      ref="jobParamForm"
      label-width="118px"
      class="form-box"
      :model="jobParamForm"
    >
      <template v-for="(param, index) in jobParamForm.params">
        <el-form-item
          :label="'时间点' + (index + 1)"
          :prop="'params.' + index + '.datetime'"
          :rules="[{ required: true, message: '请输入值', trigger: 'blur' }]"
        >
          <el-date-picker v-model="param.datetime" type="datetime" placeholder="选择日期时间" style="position: relative;"/>
            <fa-icon class="fa-minus-circle icon-add reduce-icon" @click="onReduceParam(index)"/>
          </el-date-picker>
        </el-form-item>
      </template>
      <el-form-item label="增加时间点">
        <fa-icon class="fa-plus-circle icon-add" @click="onAddJobParam"/>
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
        params: []
      },
      timeInputError: ''
    }
  },
  methods: {
    ...mapActions([
    ]),
    onSaveJob ({ jobFormData, type }) {
      this.$refs['jobParamForm'].validate((valid) => {
        if (valid) {
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
      const param = { datetime: '' }
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
  margin-left: 10px;
  color: #ff4949;
  transition: all 0.5s;
}

.reduce-icon:active {
  color: #b10000;
  transition: all 0.5s;
}

</style>
