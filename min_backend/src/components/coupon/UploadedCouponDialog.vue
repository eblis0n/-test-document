<template>
  <el-dialog
    size="tiny"
    custom-class="coupon-dialog"
    title="上传结果"
    :visible.sync="visibleDialog"
  >
    <div class="upload-warn">
      <el-alert :title="message.desc" :type="message.type" :closable="false" show-icon/>
    </div>
    <div class="total"><span>共计：</span><span>{{ total }}</span></div>
    <el-table :data="coupons" max-height="550" border>
      <el-table-column property="coupid" label="优惠券号"></el-table-column>
      <el-table-column property="nums" label="数量"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    total: { type: [ String, Number ], default: 0 },
    coupons: {
      type: Array,
      default () {
        return []
      }
    },
    message: {
      type: Object,
      default () {
        return {
          type: 'success',
          desc: '优惠券上传成功'
        }
      }
    }
  },
  data () {
    return {
      visibleDialog: this.visible
    }
  },
  watch: {
    visible (val) {
      this.visibleDialog = val
    },
    visibleDialog (val) {
      this.$emit('close-dialog', val)
    }
  }
}
</script>

<style lang="scss">
.dialog-title {
  color: red;
  font-weight: 800;
}

.upload-warn {
  margin-bottom: 30px;
}

.total {
  margin: 0 0 10px 10px;
  font-weight: 600;
}
</style>
