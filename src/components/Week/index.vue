<template>
  <div class="week">
    <div class="week_container_header">
      <WeekHeader
        :today="today"
        :current-date="currentDate"
        :current-week-day="currentWeekDay"
      />
    </div>
    <div class="week_container_body">
      <WeekBody
        :today="today"
        :current-date="currentDate"
        :current-week-day="currentWeekDay"
        :orders="orders"
      />
    </div>
  </div>
</template>

<script>
import WeekHeader from './WeekHeader'
import WeekBody from './WeekBody'

let timer = null
export default {
  name: 'Week',
  components: {
    WeekHeader,
    WeekBody
  },
  props: {
    orders: { type: Array, required: true }
  },
  data () {
    return {
      today: new Date()
    }
  },
  computed: {
    currentDate () {
      return this.today.getDate()
    },
    currentWeekDay () {
      return this.today.getDay()
    }
  },
  mounted () {
    timer = setInterval(this.updateCurrentTime, 60 * 1000)
  },
  beforeDestroy () {
    clearInterval(timer)
  },
  methods: {
    updateCurrentTime () {
      this.today = new Date()
    }
  }
}
</script>

<style lang="scss" src="./Week.scss"></style>
