<template>
  <div>
    <el-form
      ref="addRoleForm"
      label-width="100px"
      class="form-box"
      :model="addRoleForm"
    >
      <el-form-item prop="roleName" label="角色名称">
        <el-input
          v-model="addRoleForm.roleName"
          placeholder="请输入角色名称"/>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          resize="none"
          placeholder="备注信息"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="addRoleForm.remark"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onAddRole('addRoleForm')"
          :loading="btnLoading">确定</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { REQUEST_SUCCESS } from '../../utils/constant'

export default {
  data () {
    return {
      addRoleForm: { roleName: '', remark: '' },
      btnLoading: false,
      searchBtnLoading: false,
      showSearchResult: false
    }
  },
  methods: {
    ...mapActions([
      'addPredefineAction',
      'updatePredefineAction',
      'findTempById'
    ]),

    onAddRole (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleAddRoleRequest()
        } else {
          return false
        }
      })
    },

    handleAddRoleRequest () {

    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
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
