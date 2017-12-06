
<template>
  <div class="">
    <el-form
      ref="mailMsgForm"
      label-width="100px"
      class="form-box"
      :model="mailMsgForm"
      :rules="rules"
    >
      <el-form-item prop="msgType" label="消息类型">
        <el-select v-model="mailMsgForm.msgType" placeholder="请选择消息类型" style="width: 100%;">
          <el-option label="账单通知" value="noticeBill"></el-option>
          <el-option label="额度通知" value="noticeAmount"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="msgTitle" label="信箱标题">
        <el-input v-model="mailMsgForm.msgTitle" placeholder="请输入信箱标题"/>
      </el-form-item>
      <el-form-item prop="msgSubTitle" label="副标题">
        <el-input v-model="mailMsgForm.msgSubTitle" placeholder="请输入信箱副标题"/>
      </el-form-item>
      <el-form-item
        prop="clickAction"
        label="点击动作"
        :rules="[{ required: true, message: '请输入点击动作', trigger: 'blur' }]"
      >
        <el-input v-model="mailMsgForm.clickAction" placeholder="请输入点击动作"/>
        <el-button
          type="primary"
          class="btn-search__act"
          icon="search"
          @click="onSearchClickAct('mailMsgForm', 'clickAction')">查询</el-button>
      </el-form-item>
      <el-form-item
        label="动作名称"
        style="text-align:left;"
      >
        <span>{{ actionName }}</span>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="mailMsgForm.remark"/>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onAddMailMsg('mailMsgForm')">立即创建</el-button>
        <el-button @click="onResetForm('mailMsgForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mailMsgForm: {
        msgType: '',
        msgTitle: '',
        msgSubTitle: '',
        remark: ''
      },
      actionName: '',
      rules: {
        msgType: [{ required: true, message: '请选择消息类型', trigger: 'change' }],
        msgTitle: [{ required: true, message: '请输入信箱标题', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onAddMailMsg (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit')
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onSearchClickAct (formName, prop) {
      this.$refs[formName].validateField(prop, (errorMessage) => {
        if (errorMessage) {
          console.error('[ERROR]: ', errorMessage)
        } else {
          const temp = 'action = ' + this.actionName
          console.log('submit: ', temp)
          this.actionName = '搜到的动作名称'
        }
      })
    }
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
.btn-search__act {
  position: absolute;
  right:-98px;
  top:0;
}
</style>
