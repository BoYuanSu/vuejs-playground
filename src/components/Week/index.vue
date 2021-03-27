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
        :current="current"
        :today="today"
        :orders="filtOrders"
        :days-of-week="daysOfWeek"
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
    firstDateOfWeek () {
      const { year, month, date, weekDay } = this.calendar
      const firstDate = new Date(year, month, date - weekDay + this.startWeekDay)
      return {
        year: firstDate.getFullYear(),
        month: firstDate.getMonth(),
        date: firstDate.getDate(),
        weekDay: firstDate.getDay()
      }
    },
    lastDateOfWeek () {
      const { year, month, date } = this.firstDateOfWeek
      const firstDate = new Date(year, month, date + 7)
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
        day = new Date(year, month, date + i)
        days.push({
          year: day.getFullYear(),
          month: day.getMonth(),
          date: day.getDate(),
          weekDay: day.getDay()
        })
      }
      return days
    },
    filtOrders () {
      const { firstDateOfWeek, lastDateOfWeek } = this
      const first = new Date(firstDateOfWeek.year, firstDateOfWeek.month, firstDateOfWeek.date)
      const last = new Date(lastDateOfWeek.year, lastDateOfWeek.month, lastDateOfWeek.date)

      const { orders } = this
      return orders
        .filter(order => {
          const orderDate = order.reserve.from
          return orderDate > first && orderDate < last
        })
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
