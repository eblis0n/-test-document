<template>
  <div>
    <div>
      <el-form
        ref="busiAuthSetForm"
        class="form-box"
        label-width="20px"
        :model="busiAuthSetForm"
        :rules="rules"
      >
        <div class="panel-title">预定义</div>
        <el-form-item prop="checkedPredListOps">
          <el-checkbox
            class="check-all"
            :indeterminate="isCheckedPredListOpsAll"
            v-model="checkedPredListOpsAll"
            @change="onCheckPredListOps">预定义动作列表</el-checkbox>
          <el-checkbox-group v-model="busiAuthSetForm.checkedPredListOps" @change="onCheckPredListOpt">
            <el-checkbox
              v-for="predListOpt in predListOps"
              :label="predListOpt"
              :key="predListOpt">{{ predListOpt }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="checkedPredActOps">
          <el-checkbox
            class="check-all"
            :indeterminate="isCheckedPredActOpsAll"
            v-model="checkedPredActOpsAll"
            @change="onCheckAllPredActOps">添加动作</el-checkbox>
          <el-checkbox-group v-model="busiAuthSetForm.checkedPredActOps" @change="onCheckPredActOpt">
            <el-checkbox
              v-for="predAct in predActOps"
              :label="predAct"
              :key="predAct">{{ predAct }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="panel-title">任务规则</div>
        <el-form-item prop="checkedJobListOps">
          <el-checkbox
            class="check-all"
            :indeterminate="isCheckedJobListOpsAll"
            v-model="checkedJobListOpsAll"
            @change="onCheckAllJobListOps">任务规则列表</el-checkbox>
          <el-checkbox-group v-model="busiAuthSetForm.checkedJobListOps" @change="onCheckJobListOpt">
            <el-checkbox
              v-for="jobListOpt in jobListOps"
              :label="jobListOpt"
              :key="jobListOpt">{{ jobListOpt }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="checkedJobOps">
          <el-checkbox
            :indeterminate="isCheckedJobOpsAll"
            v-model="checkedJobOpsAll"
            @change="onCheckAllJobOps">任务规则列表</el-checkbox>
          <el-checkbox-group v-model="busiAuthSetForm.checkedJobOps" @change="onCheckJobOpt">
            <el-checkbox
              v-for="jobOpt in jobOps"
              :label="jobOpt"
              :key="jobOpt">{{ jobOpt }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="panel-title">旧管理后台</div>
        <el-form-item prop="checkedOldAdmin">
          <el-checkbox
            v-model="busiAuthSetForm.checkedOldAdmin"
            @change="onCheckOldAdmin">旧管理后台</el-checkbox>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSaveAuthSetting('busiAuthSetForm')" :loading="saveBtnLoading">保存</el-button>
          <el-button @click="onResetForm('busiAuthSetForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCheckedPredListOpsAll: false,
      isCheckedPredActOpsAll: false,
      isCheckedJobListOpsAll: false,
      isCheckedJobOpsAll: false,

      checkedPredListOpsAll: false,
      checkedPredActOpsAll: false,
      checkedJobListOpsAll: false,
      checkedJobOpsAll: false,

      roleMgr: '',
      busiAuthSetForm: {
        checkedPredListOps: [],
        checkedPredActOps: [],
        checkedJobListOps: [],
        checkedJobOps: []
      },
      predListOps: ['预定义列表查看', '编辑预定义', '删除预定义', '查看优惠券管理', '上传优惠券', '批量删除优惠券', '上传至ftp'],
      predActOps: ['添加模板消息', '添加信息控制', '添加参数更新', '添加显示弹窗', '添加打开页面', '添加打开文章', '添加优惠券弹窗'],
      jobListOps: ['规则列表查看', '编辑规则', '删除规则'],
      jobOps: ['添加定时触发', '添加实时触发'],

      saveBtnLoading: false,

      rules: {
        checkedRoleMgrOps: { type: 'array', required: true, message: '请至少选择一个角色管理权限', trigger: 'change' },
        checkedAuthMgrOps: { type: 'array', required: true, message: '请至少选择一个角色权限管理', trigger: 'change' }
      }
    }
  },
  methods: {
    // 预定义动作列表
    onCheckPredListOps (event) {
      this.busiAuthSetForm.checkedPredListOps = event.target.checked ? this.predListOps : []
      this.isCheckedPredListOpsAll = false
    },
    onCheckPredListOpt (value) {
      let checkedCount = value.length
      this.checkedPredListOpsAll = checkedCount === this.predListOps.length
      this.isCheckedPredListOpsAll = checkedCount > 0 && checkedCount < this.predListOps.length
    },

    // 添加动作
    onCheckAllPredActOps (event) {
      this.busiAuthSetForm.checkedPredActOps = event.target.checked ? this.predActOps : []
      this.isCheckedPredActOpsAll = false
    },
    onCheckPredActOpt (value) {
      let checkedCount = value.length
      this.checkedPredActOpsAll = checkedCount === this.predActOps.length
      this.isCheckedPredActOpsAll = checkedCount > 0 && checkedCount < this.predActOps.length
    },

    // 任务规则列表
    onCheckAllJobListOps (event) {
      this.busiAuthSetForm.checkedJobListOps = event.target.checked ? this.jobListOps : []
      this.isCheckedJobListOpsAll = false
    },
    onCheckJobListOpt (value) {
      let checkedCount = value.length
      this.checkedJobListOpsAll = checkedCount === this.jobListOps.length
      this.isCheckedJobListOpsAll = checkedCount > 0 && checkedCount < this.jobListOps.length
    },

    // 添加任务规则
    onCheckAllJobOps (event) {
      this.busiAuthSetForm.checkedJobOps = event.target.checked ? this.jobOps : []
      this.isCheckedJobOpsAll = false
    },
    onCheckJobOpt (value) {
      let checkedCount = value.length
      this.checkedJobOpsAll = checkedCount === this.jobOps.length
      this.isCheckedJobOpsAll = checkedCount > 0 && checkedCount < this.jobOps.length
    },

    onCheckOldAdmin (event) {
      this.busiAuthSetForm.checkedOldAdmin = event.target.checked
    },

    onSaveAuthSetting (formName) {

    },
    onResetForm (formName) {
      this.$refs[formName].resetFields()

      this.isCheckedPredListOpsAll = false
      this.isCheckedPredActOpsAll = false
      this.isCheckedJobListOpsAll = false
      this.isCheckedJobOpsAll = false
      this.checkedPredListOpsAll = false
      this.checkedPredActOpsAll = false
      this.checkedJobListOpsAll = false
      this.checkedJobOpsAll = false
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-title {
  margin: 20px;
  font-weight: 800;
  font-size: 16px;
}
.form-box {
  width: 880px;
  text-align: left;
  margin-top: 20px;
}
.check-all {
  font-weight: 600;
  font-size: 15px;
}
</style>
