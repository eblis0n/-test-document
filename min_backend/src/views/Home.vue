<template>
  <div class="home">
    <div class="wel-box">
      <div class="mascot"><img src="../assets/images/no_record.png"></div>
      <div class="welcome"><img src="../assets/images/welcome.png" alt="欢迎使用腾讯简卡管理平台"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.home {
  width: 100%;
  text-align: center;
}

.wel-box {
  margin-top: 10%;
  height: 120px;
}

.wel-box > div {
  display: inline-block;
  vertical-align: middle;
}

.mascot {
}

.mascot > img {
  height: 120px;
  width: auto;
}
.welcome {
  margin: 0 auto;
  margin-left: 30px;
}

.welcome > img {
  height: 48px;
  width: auto;
}
</style>
