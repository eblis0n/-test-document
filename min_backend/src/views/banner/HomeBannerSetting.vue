<template>
  <div>
    <div class="top-panel__box">
      <span>年：</span>
      <el-date-picker
        v-model="currentYear"
        align="left"
        type="year"
        :default-value="currentYear"
        @change="onPickYear"
      />
    </div>
    <el-tabs type="border-card" :value="currentMonth" @tab-click="onTabClick">
      <template v-for="(month, index) in months">
        <el-tab-pane
          :label="month.name"
          :name="month.month + ''"
        >
          <home-banner-table
            :month="month.month"
            :year="currentYear * 1"
            v-if="month.show"/>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import HomeBannerTable from '../../components/banner/HomeBannerTable'

const YEAR = (new Date()).getFullYear() + ''
const MONTH = ((new Date()).getMonth() + 1) + ''

export default {
  components: { HomeBannerTable },
  data () {
    return {
      currentYear: YEAR,
      currentMonth: MONTH,
      months: [
        { month: 1, name: '1月', show: false },
        { month: 2, name: '2月', show: false },
        { month: 3, name: '3月', show: false },
        { month: 4, name: '4月', show: false },
        { month: 5, name: '5月', show: false },
        { month: 6, name: '6月', show: false },
        { month: 7, name: '7月', show: false },
        { month: 8, name: '8月', show: false },
        { month: 9, name: '9月', show: false },
        { month: 10, name: '10月', show: false },
        { month: 11, name: '11月', show: false },
        { month: 12, name: '12月', show: false }
      ],
      homeBanners: []
    }
  },
  methods: {
    onPickYear (year) {
      this.currentYear = year
    },

    onTabClick (event) {
      const { name } = event

      let month = this.months[this.currentMonth * 1 - 1]
      month.show = false
      this.$set(this.months, this.currentMonth - 1, month)

      this.currentMonth = name

      month = this.months[this.currentMonth * 1 - 1]
      month.show = true
      this.$set(this.months, this.currentMonth - 1, month)
    }
  },
  created () {
    this.months[this.currentMonth - 1].show = true
  }
}
</script>

<style lang="scss">
</style>
