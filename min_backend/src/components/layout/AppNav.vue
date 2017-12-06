<template>
  <div :class="'nav ' + (theme === 'dark' ? 'nav-dark' : '')">
    <el-menu
      class="menu-vertical"
      router
      :default-active="defaultActiveMenu"
      :collapse="isCollapse"
      :default-openeds="defaultOpeneds"
      :theme="theme"
    >
      <el-menu-item index="/" class="menu-home">
        <fa-icon
          :class="isCollapse ? 'fa-bars' : 'fa-home'"
          @click="collapseMenu"></fa-icon>
        <span slot="title">首页</span>
        <div class="icon-collapse__box" @click="collapseMenu" v-if="!isCollapse">
          <fa-icon class="icon-collapse fa-bars"/>
        </div>
      </el-menu-item>
      <template v-for="(menu, key, index) in menus">
        <el-submenu
          :index="menu.path || (index + '')"
          :key="index"
          v-if="menu.submenus !== undefined && menu.submenus.length > 0"
        >
          <template slot="title">
            <fa-icon :class="menu.class"></fa-icon>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="submenu in menu.submenus">
            <el-menu-item :index="submenu.path ||  (index + '')" >{{ submenu.name }}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item
          :index="menu.path ||  (index + '')"
          :key="index"
          v-else
        >
          <fa-icon :class="menu.class"></fa-icon>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import FaIcon from '../commons/FaIcon'
import { COLLAPSE_NAV } from '../../store/mutation-types'

export default {
  name: 'navigation',
  components: { FaIcon },
  data () {
    return {
      theme: 'linght',
      path: {
        name: 'cs-file-monitor'
      },
      isCollapse: false,
      isCollapseNav: false,
      defaultOpeneds: ['1', '2'],
      menus: [
        {
          name: 'Banner管理',
          path: 'BANNER_MRG',
          class: 'fa-picture-o',
          submenus: [
            {path: '/banner/setting', name: '首页banner日历配置'}
          ]
        },
        {
          name: '预定义',                // 组菜单名
          path: 'PREDEFINE',            // 组菜单路径
          class: 'fa-pencil-square',    // 组菜单图标类名(使用element-ui或font-awesome的图标)
          submenus: [
            {path: '/predefine/list', name: '预定义动作列表'}, // 子菜单
            {path: '/predefine/add', name: '添加动作'}
          ]
        },
        // {
        //   name: '任务规则',
        //   path: 'JOB_RULE',
        //   class: 'fa-windows',
        //   submenus: [
        //     {path: '/job/list', name: '任务规则列表'},
        //     {path: '/job/add', name: '添加任务'}
        //   ]
        // },
        // {
        //   name: '用户及权限管理',
        //   path: 'USER_AUTH_MGR',
        //   class: 'fa-users',
        //   submenus: [
        //     {path: '/user/role', name: '角色管理'},
        //     {path: '/user/auth', name: '角色权限管理'},
        //     {path: '/user', name: '用户管理'}
        //   ]
        // },
        {
          name: '旧管理后台',
          class: 'el-icon-setting',
          submenus: [
            {path: '/old', name: '旧管理后台'}
          ]
        }
      ]
    }
  },
  methods: {
    collapseMenu (event) {
      event.stopPropagation()
      this.isCollapse = !this.isCollapse
      this.$store.commit(COLLAPSE_NAV, this.isCollapse)
    }
  },
  computed: {
    defaultActiveMenu () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/common.scss';

.nav {
  height: 100%;
  background-color: $side-bar-bg-color;
  box-sizing: border-box;
}

.nav-dark {
  background-color: rgb(50, 67, 87);
}

.nav-head {
  height: 50px;
  line-height: 50px;
  background-color: $side-bar-bg-color;
  color: $side-bar-color;
  padding-left: 20px;
  border-bottom: 1px solid $side-bar-border-color;
  transition: all 0.41s;
  font-size: 14px;
  cursor: pointer;
}

.nav-head-dark {
  background-color: $side-bar-bg-color-dark;
  color: $side-bar-color-dark;
  border-bottom: 1px solid $side-bar-border-color-dark;
}

.nav-head:hover {
  background-color: $side-bar-hover-bg-color;

}

.nav-head-dark:hover {
  background-color: $side-bar-hover-bg-color-dark;
}

.menu-home {
  border-bottom: 1px solid $side-bar-border-color;
}

.icon-collapse__box {
  cursor: pointer;
  float: right;
}

.icon-collapse {
  margin-right: 0!important;
}

.nav-head__collapse {
  width: 44px;
  transition: all 0.41s;
}

.nav-head > div {
  display: inline-block;
}

.nav-switch {
  margin-left: 100px;
  opacity: 1;
  transition: all 0.41s;
}

.nav-switch__collapse {
  margin-left: 0;
  opacity: 0;
  transition: all 0.41s;
}

.collapse-bar {
  margin-left: 198px;
  transition: all 0.41s;
}

.collapse-bar__collapse {
  margin-left: 0;
  transition: all 0.41s;
}

.menu-vertical {
  border-radius: 0;
  height: 100%;
}

.menu-vertical:not(.el-menu--collapse) {
  width: 252px;
}

.nav-collapse {
  height: 24px;
}
</style>
