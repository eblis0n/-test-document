<template>
  <div class="head">
    <div class="sys-title">
      <div class="logo">
        <img src="../../assets/images/icons/logo_card.png" alt="广州银行信用卡">
      </div>
      <div class="title"><img src="../../assets/images/icons/title_white.png" alt="腾讯简卡管理平台"></div>
    </div>
    <div class="user">
      <el-dropdown class="user-dropdown">
        <div class="user-name">
          <fa-icon class="fa-user-circle user-head"></fa-icon>
          <span>{{ userName }}</span>
          <!-- <i class="el-icon-caret-bottom el-icon--right" style=""></i> -->
          <!-- <fa-icon class="fa-angle-down user-down"/> -->
          <fa-icon class="fa-caret-down user-down"/>

        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="onLogout">
            <fa-icon class="fa-sign-out"></fa-icon>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import FaIcon from '../commons/FaIcon'
import { COLLAPSE_NAV } from '../../store/mutation-types'
import { removeSesstion, getSesstion } from '../../utils/util'

export default {
  name: 'PageHead',
  components: { FaIcon },
  data () {
    return {
      userName: ''
    }
  },
  computed: mapState({
    isCollapse: state => state.menu.isNavCollapse
  }),
  ...mapMutations([
    COLLAPSE_NAV
  ]),
  methods: {
    ...mapActions([
      'fetchLogout'
    ]),
    collapseNav () {
      this.$store.commit(COLLAPSE_NAV)
    },

    onLogout () {
      this.fetchLogout().then(res => {
        removeSesstion()
        this.$router.push({ name: 'LOGIN' })
      })
    }
  },
  created () {
    this.userName = getSesstion().userName
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.head {
  background: #0767c8;
  background: -webkit-linear-gradient(top,#086ed5,#055db5);
  border-bottom: 1px solid #044e97;
  box-shadow: 0 1px 2px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.15);
  height: 100%;
  line-height: 100%;
  text-align: left;
  position: relative;
  box-sizing: border-box;
}

.head > div {
  display: table;
}

.sys-title {
  padding-left: 20px;
  height: 100%;
  opacity: 1;
  transition: all 0.4s;
  position: relative;
  z-index: 0;
}

.sys-title-scollape {
  transition: all 0.4s;
  width: 0;
  height: 0;
  opacity: 0;
}

.sys-title > div {
  display: table-cell;
  vertical-align: middle;
  height: 100%;
  line-height: 100%;
}

.logo > img {
  height: 28px;
}

.title > img {
  height: 16px;
  margin: 8px 0 0 10px;
}

.icon-bar {
  padding-left: 12px;
  height:$headerbar-height;
  line-height: $headerbar-height;
  vertical-align: top;
  position: relative;
  z-index: 9;
}

.icon-bar > img {
  width: 20px;
  vertical-align: middle;
  border-radius: 2px;
  transition: all .5s;
}

.icon-bar > img:hover {
  background-color: rgba(229, 213, 209, 0.65);
  transition: all .5s;
}

.icon-bar-scollape {
  border-right: 1px solid #e2e2e2;
  padding-left: 0px;
  padding-right: 18px;
}

.user {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  line-height: 58px;
  transition: all 0.6s;
  padding: 0 8px;
  cursor: pointer;
}

.user:hover {
  background-color: #0090e2;
  transition: all 0.6s;
}

.user-dropdown {
  height: 100%;
  display: table;
}

.user-name {
  color: #fff;
  height: 100%;
  // line-height: 100%;
  display: table-cell;
  vertical-align: middle;
}

.user-head {
  // display: inline-block;
  // height: 32px;
  // width: 32px;
  // border-radius: 16px;
  // background-color: #f2f2f2;
  vertical-align: middle;
  margin-right: 4px;
  font-size: 22px;
}

.user-down {
  font-size: 18px;
  margin-left: 2px;
  // vertical-align: middle;
}
.user-head > img {
  height: 32px;
  vertical-align: top;
}
</style>
