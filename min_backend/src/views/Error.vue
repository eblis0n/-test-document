<template>
  <div class="error">
    <!-- <div class="icon-mascot"><img src="../assets/images/no_record.png"></div> -->
    <div class="err-text-box">
      <div class="icon-404"><img src="../assets/images/404_icon.png"></div>
      <div class="err-text">抱歉！您访问的页面不存在了...</div>
      <div class="err-desc">
        <div class="">可能原因:</div>
        <div class="">1.在地址栏输入了错误的地址</div>
        <div class="">2.你点击的某个链接已过期</div>
      </div>
      <div class="btn-back">
        <div>
          <el-button type="text" @click="onGoBack">&nbsp;>>&nbsp;返回上一个页面</el-button>
        </div>
        <div>
          <el-button type="text" @click="onGoHome">&nbsp;>>&nbsp;返回首页</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    onGoBack () {
      this.$router.go(-1)
    },

    onGoHome () {
      this.$router.push({ path: '/' })
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang="scss">
@import '../assets/css/common.scss';

.error {
  margin: 10% 0 0 25%;
}

.error > div {
  display: inline-block;
  vertical-align: top;
  height: 161px;
}

.err-text-box {
  margin-left: 40px;
}

.icon-mascot > img {
  width: 136px;
  height: 161px;
  vertical-align: top;
}

.err-text {
  margin-top: 40px;
  font-size: 28px;
  color: $theme-color;
}

.icon-404 > img{
  height: 128px;
  vertical-align: top;
}

.err-desc {
  margin-top: 20px;
  line-height: 24px;
  font-size: 16px;
}

.btn-back {
  margin-top: 20px;
}
</style>
