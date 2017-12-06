<template>
  <div>
    <div class="aid-box">
      <span>动作ID：</span><span class="aid">{{ aid }}</span>
    </div>
    <el-tabs type="border-card" :value="currentTab">
      <el-tab-pane label="模板消息" name="0" :disabled="enableTabPane[0]">
        <predefine-msg-template
          :aid="aid"
          :for-update="true"
          :msg-template="msgTemplate"/>
      </el-tab-pane>
      <el-tab-pane label="信息控制" name="1" :disabled="enableTabPane[1]">
        <predefine-xlist
          :aid="aid"
          :for-update="true"
          :xlist="xlist"/>
      </el-tab-pane>
      <el-tab-pane label="信箱消息" name="2":disabled="enableTabPane[2]">
        <predefine-mail/>
      </el-tab-pane>
      <el-tab-pane label="参数更新" name="3" :disabled="enableTabPane[3]">
        <predefine-param-update
          :aid="aid"
          :for-update="true"
          :update-params="updateParams"/>
      </el-tab-pane>
      <el-tab-pane label="显示弹窗" name="4" :disabled="enableTabPane[4]">
        <predefine-popup
          :aid="aid"
          :for-update="true"
          :isclosepermit="isclosepermit"
          :popup-window="popupWindow"/>
      </el-tab-pane>
      <el-tab-pane label="指引程序" name="5" :disabled="enableTabPane[5]">
        <predefine-program-guide/>
      </el-tab-pane>
      <el-tab-pane label="打开页面" name="6" :disabled="enableTabPane[6]">
        <predefine-open-page :aid="aid" :for-update="true" :page="page"/>
      </el-tab-pane>
      <el-tab-pane label="打开文章" name="7" :disabled="enableTabPane[7]">
        <predefine-open-art
          :aid="aid"
          :for-update="true"
          :art-open="artOpen"/>
      </el-tab-pane>
      <el-tab-pane label="优惠券弹窗" name="8" :disabled="enableTabPane[8]">
        <predefine-coupon-popup
          :aid="aid"
          :for-update="true"
          :show-button="showButton"
          :coupon-popup="couponPopup"/>
      </el-tab-pane>
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

import { mapActions } from 'vuex'
import { REQUEST_SUCCESS, PREDEFINE_TYPE } from '../../utils/constant'

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
  },
  data () {
    return {
      enableTabPane: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true },
      predefineType: 0,
      currentTab: 0,
      aid: '0',
      msgTemplate: { bid: '', remark: '' },
      xlist: { xid: '', ismove: '', remark: '' },
      popupWindow: {
        title: '',
        text: '',
        buttontext: '',
        subactid: '',
        closeText: '',
        isclosepermit: false,
        remark: ''
      },
      isclosepermit: false, // 显示弹窗中是否显示关闭按钮
      page: { url: '', remark: '' },
      artOpen: { articleid: '', remark: '' },
      updateParams: {
        params: [{
          variable: '',
          mode: '',
          value: '',
          showAddBtn: true,
          showReduceBtn: true
        }],
        remark: ''
      },
      couponPopup: {
        name: '',
        popText: '',
        lessText: '',
        showButton: '',
        actText: '',
        actids: '',
        remark: '',
        coupid: ''
      },
      showButton: false // 优惠券弹窗中是否显示副按钮
    }
  },
  methods: {
    ...mapActions([
      'fetchPredefineAction'
    ]),
    updateCurrentTab () {
      const { type } = this.$route.params
      const { aid } = this.$route.query

      this.enableTabPane[this.currentTab] = true

      this.aid = aid
      this.currentTab = type
      this.enableTabPane[type] = false

      this.fetchPredefineAction({ aid }).then(res => {
        const code = res.code
        if (code === REQUEST_SUCCESS) {
          const { remark, content } = res
          this.formatPredefineInfo(type, content, remark)
        }
      })
    },

    formatPredefineInfo (type, content, remark) {
      if (!type || !content) return

      const formatInfo = (obj) => {
        for (let key in obj) {
          const item = content[key]
          this.$set(obj, key, item)
        }
        this.$set(obj, 'remark', remark)
      }

      switch (type) {
        case PREDEFINE_TYPE.TEMPLATE_MSG.value:
          formatInfo(this.msgTemplate)
          break
        case PREDEFINE_TYPE.XLIST.value:
          formatInfo(this.xlist)
          break
        case PREDEFINE_TYPE.PARAM_UPDATE.value:
          // keep-alive原因，这里push会叠加，所以先清除
          this.updateParams.params = []
          content.forEach((item, index) => {
            if (index === content.length - 1) {
              item.showAddBtn = true
              if (content.length > 1) {
                item.showReduceBtn = true
              }
            }
            this.updateParams.params.push(item)
          })
          this.$set(this.updateParams, 'remark', remark)
          break
        case PREDEFINE_TYPE.POPUP_WINDOW.value:
          formatInfo(this.popupWindow)
          this.isclosepermit = this.popupWindow.isclosepermit === '1'
          break
        case PREDEFINE_TYPE.OPEN_PAGE.value:
          formatInfo(this.page)
          break
        case PREDEFINE_TYPE.OPEN_ARTICLE.value:
          formatInfo(this.artOpen)
          break
        case PREDEFINE_TYPE.COUPON_POPUP.value:
          formatInfo(this.couponPopup)
          this.showButton = this.couponPopup.showButton === '1'
          break
        default:
      }
    }
  },
  activated () {
    this.updateCurrentTab()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.aid-box {
  padding: 10px 20px;
  background-color: rgb(238, 242, 246);
  margin-bottom: 10px;
  border: 1px solid $main-border-color;
}

.aid {
  margin-left: 10px;
}
</style>
