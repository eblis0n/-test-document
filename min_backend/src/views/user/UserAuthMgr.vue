<template>
  <div>
    <div class="top-panel__box">
      <span>角色：</span>
      <el-select v-model="currentRole" placeholder="选择角色">
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.name"
          :value="item.value"/>
      </el-select>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="管理权限">
        <user-auth-setting-panel/>
      </el-tab-pane>
      <el-tab-pane label="业务权限">
        <busi-auth-setting-panel/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserAuthSettingPanel from '../../components/user/UserAuthSettingPanel'
import BusiAuthSettingPanel from '../../components/user/BusiAuthSettingPanel'

export default {
  components: { UserAuthSettingPanel, BusiAuthSettingPanel },
  data () {
    return {
      loading: false,
      currentTabNO: 0,
      lastTabNO: 0,
      roles: [],
      currentRole: ''
    }
  },
  methods: {
    ...mapActions([
      ''
    ])
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
</style>
