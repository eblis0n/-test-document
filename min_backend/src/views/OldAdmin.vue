<template>
  <iframe :src="OLD_URL" width="100%" height="960px"></iframe>
</template>

<script>
import { OLD_URL } from '../utils/constant'
export default {
  data () {
    return {
      OLD_URL
    }
  }
}
</script>

<style lang="css">
</style>
