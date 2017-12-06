<template>
  <div class="wrapper">
    <el-row class="app-header"><app-header></app-header></el-row>
    <el-row class="container">
      <div class="sidebar"><app-nav></app-nav></div>
      <div :class="'content ' + (isCollapse ? 'nav-collapse ' : '') + (isRealtimeView ? 'clear-padding' : '')">
          <breadcrumb :breadcrumbs="breadcrumbs" v-if="!isRealtimeView"></breadcrumb>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
      </div>
    </el-row>
  </div>
</template>

<script>
import AppHeader from '../components/layout/AppHeader'
import AppNav from '../components/layout/AppNav'
import Breadcrumb from '../components/layout/Breadcrumb'
import { mapState } from 'vuex'

export default {
  components: { AppHeader, AppNav, Breadcrumb },
  computed: {
    ...mapState({
      isCollapse: state => state.menu.isNavCollapse,
      breadcrumbs: state => state.menu.breadcrumbs
    }),
    isRealtimeView () {
      return (this.$route.name === 'ERROR')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.app-header {
  height: 6%;
  min-height: 58px;
}

.container {
  min-height: 94%;
}

.container > div {
  // height: 100%;
}

.sidebar {
  height: 100%;
  vertical-align: top;
  position: absolute;
  left: 0;
  top: 0;
}

.content-box {

}

.content {
  padding: 20px;
  padding-left: 272px;
  transition: all 0.5s;
  box-sizing: border-box;
}

.clear-padding {
  padding: 0 0 0 252px;
  transition: all 0.5s;
}

 .nav-collapse {
  padding-left: 85px;
  transition: all 0.5s;
}

.clear-padding.nav-collapse {
  padding-left: 65px;
}
</style>
