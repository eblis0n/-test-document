<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="模板消息"><predefine-msg-template/></el-tab-pane>
      <el-tab-pane label="信息控制"><predefine-xlist/></el-tab-pane>
      <el-tab-pane label="信箱消息" :disabled="true"><predefine-mail/></el-tab-pane>
      <el-tab-pane label="参数更新"><predefine-param-update/></el-tab-pane>
      <el-tab-pane label="显示弹窗"><predefine-popup/></el-tab-pane>
      <el-tab-pane label="指引程序" :disabled="true"><predefine-program-guide/></el-tab-pane>
      <el-tab-pane label="打开页面"><predefine-open-page/></el-tab-pane>
      <el-tab-pane label="打开文章"><predefine-open-art/></el-tab-pane>
      <el-tab-pane label="优惠券弹窗"><predefine-coupon-popup/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PredefineMsgTemplate from '../../components/predefine/PredefineMsgTemplate'
import PredefineXlist from '../../components/predefine/PredefineXlist'
import PredefineMail from '../../components/predefine/PredefineMail'
import PredefineParamUpdate from '../../components/predefine/PredefineParamUpdate'
import PredefinePopup from '../../components/predefine/PredefinePopup'
import PredefineProgramGuide from '../../components/predefine/PredefineProgramGuide'
import PredefineOpenPage from '../../components/predefine/PredefineOpenPage'
import PredefineOpenArt from '../../components/predefine/PredefineOpenArt'
import PredefineCouponPopup from '../../components/predefine/PredefineCouponPopup'

export default {
  components: {
    PredefineMsgTemplate,
    PredefineXlist,
    PredefineMail,
    PredefineParamUpdate,
    PredefinePopup,
    PredefineProgramGuide,
    PredefineOpenPage,
    PredefineOpenArt,
    PredefineCouponPopup
  }
}
</script>

<style lang="css">
</style>
