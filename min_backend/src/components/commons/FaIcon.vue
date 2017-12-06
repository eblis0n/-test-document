<template>
  <i
    :class="'fa-icon fa ' + iconStyle "
    aria-hidden="true"
    @click="onClick($event)"
  ></i>
</template>

<script>
// const MOUSE_EVENTS = [
//   'click',
//   'dblclick',
//   'mouseover',
//   'mouseout',
//   'mousedown',
//   'mouseup',
//   'globalout'
// ]
export default {
  props: ['iconStyle'],
  methods: {
    onClick ($event) {
      this.$emit('click', $event)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.fa-icon {
  margin-right: 8px;
}
</style>
