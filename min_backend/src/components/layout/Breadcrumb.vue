<template lang="html">
  <el-breadcrumb separator="/" class="breadcrumb">
    <template v-for="item in breadcrumbs">
      <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
      default: function () {
        return [{name: '首页', path: '/'}]
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/common.scss';

.breadcrumb {
  width: 100%;
  border-bottom: 1px solid $main-border-color;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
