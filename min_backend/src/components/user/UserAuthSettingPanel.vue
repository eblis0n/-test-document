<template>
  <div>
    <div class="panel-title">用户权限管理</div>
    <div>
      <el-form
        ref="roleAuthMgrForm"
        class="form-box"
        label-width="20px"
        :model="roleAuthMgrForm"
        :rules="rules"
      >
        <el-form-item prop="checkedRoleMgrOps">
          <el-checkbox
            class="check-all"
            :indeterminate="isIndeterminate"
            v-model="checkRoleMgrAll"
            @change="onCheckAll">角色管理</el-checkbox>
          <el-checkbox-group v-model="roleAuthMgrForm.checkedRoleMgrOps" @change="onCheckedRoleAuth">
            <el-checkbox
              v-for="roleMgr in roleMgrOps"
              :label="roleMgr.name"
              :key="roleMgr.auth">{{ roleMgr.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="checkedAuthMgrOps">
          <el-checkbox
            class="check-all"
            :indeterminate="isCheckAllAuthMgr"
            v-model="checkAuthMgrAll"
            @change="onCheckAllAuthMgr">角色权限管理</el-checkbox>
          <el-checkbox-group v-model="roleAuthMgrForm.checkedAuthMgrOps" @change="onCheckedAuthMgrOpt">
            <el-checkbox
              v-for="authMgr in authMgrOps"
              :label="authMgr.name"
              :key="authMgr.auth">{{ authMgr.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="checkedUserMgrOps">
          <el-checkbox
            class="check-all"
            :indeterminate="isCheckedAllUserMgr"
            v-model="checkUserMgrAll"
            @change="onCheckAllUserMgrOps">用户管理</el-checkbox>
          <el-checkbox-group v-model="roleAuthMgrForm.checkedUserMgrOps" @change="onCheckUserMgrOpt">
            <el-checkbox
              v-for="userMgr in userMgrOps"
              :label="userMgr"
              :key="userMgr">{{ userMgr }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSaveAuthSetting('roleAuthMgrForm')" :loading="saveBtnLoading">保存</el-button>
          <el-button @click="onResetForm('roleAuthMgrForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isIndeterminate: true,
      isCheckAllAuthMgr: true,
      isCheckedAllUserMgr: true,
      checkRoleMgrAll: false,
      checkAuthMgrAll: false,
      checkUserMgrAll: false,
      roleMgr: '',
      roleAuthMgrForm: {
        checkedRoleMgrOps: ['角色查看', '新增角色'],
        checkedAuthMgrOps: ['权限查看'],
        checkedUserMgrOps: ['用户查看']
      },
      roleMgrOps: [
        { name: '角色查看', auth: 'roleCheck' },
        { name: '新增角色', auth: 'roleAdd' },
        { name: '编辑角色', auth: 'roleUpdate' },
        { name: '删除角色', auth: 'roleDelete' },
        { name: '修改权限配置', auth: 'roleAuthSetting' }
      ],
      authMgrOps: [
        { name: '权限查看', auth: 'authCheck' },
        { name: '权限配置', auth: 'authSetting' }
      ],
      userMgrOps: ['用户查看', '新增用户', '编辑用户', '删除用户', '用户角色配置', '更改用户状态', '更改用户密码'],
      rules: {
        checkedRoleMgrOps: { type: 'array', required: true, message: '请至少选择一个角色管理权限', trigger: 'change' },
        checkedAuthMgrOps: { type: 'array', required: true, message: '请至少选择一个角色权限管理', trigger: 'change' }
      }
    }
  },
  methods: {
    onCheckAll (event) {
      const allRoleMgrOps = []
      this.roleMgrOps.forEach(item => {
        allRoleMgrOps.push(item.name)
      })

      this.roleAuthMgrForm.checkedRoleMgrOps = event.target.checked ? allRoleMgrOps : []
      this.isIndeterminate = false
    },
    onCheckedRoleAuth (value) {
      let checkedCount = value.length
      this.checkRoleAuthsAll = checkedCount === this.roleMgrOps.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleMgrOps.length
    },

    onCheckAllAuthMgr (event) {
      const allAuthMgrOps = []
      this.authMgrOps.forEach(item => {
        allAuthMgrOps.push(item.name)
      })

      this.roleAuthMgrForm.checkedAuthMgrOps = event.target.checked ? allAuthMgrOps : []
      this.isCheckAllAuthMgr = false
    },
    onCheckedAuthMgrOpt (value) {
      let checkedCount = value.length
      this.checkAuthMgrAll = checkedCount === this.authMgrOps.length
      this.isCheckAllAuthMgr = checkedCount > 0 && checkedCount < this.authMgrOps.length
    },

    onCheckAllUserMgrOps (event) {
      const allUserMgrOps = []
      this.userMgrOps.forEach(item => {
        allUserMgrOps.push(item)
      })

      this.roleAuthMgrForm.checkedUserMgrOps = event.target.checked ? allUserMgrOps : []
      this.isCheckedAllUserMgr = false
    },
    onCheckUserMgrOpt (value) {
      let checkedCount = value.length
      this.checkUserMgrAll = checkedCount === this.userMgrOps.length
      this.isCheckedAllUserMgr = checkedCount > 0 && checkedCount < this.userMgrOps.length
    },

    onSaveAuthSetting (formName) {

    },
    onResetForm (formName) {

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
