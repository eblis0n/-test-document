<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="实时监听"><job-realtime-form/></el-tab-pane>
      <el-tab-pane label="定时触发"><job-timing-form/></el-tab-pane>
      <el-tab-pane label="循环定时" :disabled="true"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import JobRealtimeForm from '../../components/job/JobRealtimeForm'
import JobTimingForm from '../../components/job/JobTimingForm'

export default {
  components: {
    JobRealtimeForm,
    JobTimingForm
  }
}
</script>

<style lang="css">
</style>
