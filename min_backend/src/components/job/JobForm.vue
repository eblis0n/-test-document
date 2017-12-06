
<template>
  <div>
    <el-form
      ref="jobForm"
      label-width="118px"
      class="form-box"
      :model="jobForm"
      :rules="rules"
    >
      <el-form-item label="触发对象" prop="triggerObj">
        <el-input
          placeholder="请输入标签ID，空格键分隔"
          v-model="jobForm.triggerObj"/>
      </el-form-item>
      <el-form-item label="触发动作" prop="triggerAct" >
        <el-input
          placeholder="请输入触发动作ID，空格键分隔"
          v-model="jobForm.triggerAct"/>
      </el-form-item>
      <el-form-item label="是否重复任务" prop="isrepeat">
        <el-radio-group v-model="jobForm.isrepeat" size="medium" disabled>
          <el-radio-button label="1">是</el-radio-button>
          <el-radio-button label="0">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排异任务" prop="rejectAct">
        <el-input
          disabled
          placeholder="暂时不支持排异任务"
          v-model="jobForm.rejectAct"/>
      </el-form-item>
      <el-form-item label="任务标签" prop="tag">
        <el-input
          placeholder="请输入标签，空格键分隔"
          v-model="jobForm.tag"/>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="jobForm.remark"/>
      </el-form-item>
      <el-form-item class="form-btn">
        <el-button
          type="primary"
          :loading="saveBtnLoading === 'start'"
          @click="onSaveJob('jobForm', 'start')"
        >
          <fa-icon class="fa-check-square" v-if="saveBtnLoading !== 'start'"/>保存并启用
        </el-button>
        <el-button
          type="danger"
          :loading="saveBtnLoading === 'forbidden'"
          @click="onSaveJob('jobForm', 'forbidden')"
        >
          <fa-icon class="fa-ban" v-if="saveBtnLoading !== 'forbidden'"/>保存并禁用
        </el-button>
        <el-button @click="onResetForm('jobForm')"><fa-icon class="fa-undo"/>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FaIcon from '../commons/FaIcon.vue'

export default {
  components: { FaIcon },
  data () {
    return {
      jobForm: {
        triggerObj: '',
        triggerAct: '',
        isrepeat: '0',
        rejectAct: '',
        tag: '',
        remark: ''
      },
      saveBtnLoading: '',  // 保存任务按钮loading标识，start: 保存并启用 forbidden: 保存并禁用
      rules: {
        triggerObj: [{ required: true, message: '请输入标签标签ID，空格键分隔', trigger: 'blur' }],
        triggerAct: [{ required: true, message: '请输入触发动作ID，空格键分隔', trigger: 'blur' }],
        // rejectAct: [{ required: true, message: '请输入需要排异已完成任务的ID，空格键分隔', trigger: 'blur' }],
        tag: [{ required: true, message: '请输入标签，空格键分隔', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSaveJob (formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const jobFormData = this.jobForm
          this.$emit('save-job', { jobFormData, type })
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  width: 608px;
  text-align: left;
  margin-top: 20px;
}

.form-btn {
  text-align: center;
}
</style>
