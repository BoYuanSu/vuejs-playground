<template>
  <div class="week">
    <div class="week_container_header">
      <WeekHeader
        :today="today"
        :days-of-week="daysOfWeek"
      />
    </div>
    <div class="week_container_body">
      <WeekBody
        :today="current"
        :current-date="currentDate"
        :current-week-day="currentWeekDay"
        :first-date-of-week="firstDateOfWeek"
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
    const now = new Date()
    return {
      current: now,
      today: {
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        weekDay: now.getDay()
      },
      calendar: {
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        weekDay: now.getDay()
      },
      startWeekDay: 1
    }
  },
  computed: {
    currentDate () {
      return this.calendar.date
    },
    currentWeekDay () {
      return this.calendar.weekDay
    },
    firstDateOfWeek () {
      const { year, month, date, weekDay } = this.calendar
      const firstDate = new Date(year, month, date - weekDay)
      return {
        year: firstDate.getFullYear(),
        month: firstDate.getMonth(),
        date: firstDate.getDate(),
        weekDay: firstDate.getDay()
      }
    },
    daysOfWeek () {
      const days = []
      const { year, month, date } = this.firstDateOfWeek
      let day = null
      for (let i = 0; i < 7; i++) {
        day = new Date(year, month, date + i + this.startWeekDay)
        days.push({
          year: day.getFullYear(),
          month: day.getMonth(),
          date: day.getDate(),
          weekDay: day.getDay()
        })
      }
      return days
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
      this.current = new Date()
    }
  }
}
</script>

<style lang="scss" src="./Week.scss"></style>
