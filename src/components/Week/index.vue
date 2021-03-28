<template>
  <div class="week">
    <div class="week_container_header">
      <WeekHeader
        :today="today"
        :days-of-week="daysOfWeek"
        :calendar="bodyComponent === 'DayBody' ? calendar: {}"
        @selectDate="selectDateHandler"
      />
    </div>
    <transition-group
      :name="transitionName"
      tag="div"
      class="week_container_body"
      mode="out-in"
    >
      <WeekBody
        v-if="bodyComponent === 'WeekBody'"
        key="WeekBody"
        :current="current"
        :today="today"
        :orders="filtOrders"
        :days-of-week="daysOfWeek"
      />
      <DayBody
        v-if="bodyComponent === 'DayBody'"
        key="DayBody"
        :current="current"
        :calendar="calendar"
        :orders="filtSingleDateOrders"
      />
    </transition-group>
  </div>
</template>

<script>
import WeekHeader from './WeekHeader'
import WeekBody from './WeekBody'
import DayBody from './DayBody'

let timer = null
export default {
  name: 'Week',
  components: {
    WeekHeader,
    WeekBody,
    DayBody
  },
  props: {
    mode: { type: String, required: true },
    orders: { type: Array, required: true },
    schedules: { type: Array, required: true }
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
    bodyComponent () {
      const mapCom = {
        '週': 'WeekBody',
        '日': 'DayBody'
      }
      return mapCom[this.mode]
    },
    transitionName () {
      const mapTrans = {
        '週': 'scale-out',
        '日': 'scale-up'
      }
      return mapTrans[this.mode]
    },
    firstDateOfWeek () {
      let { year, month, date, weekDay } = this.calendar
      weekDay = weekDay || 7
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
    // 過濾當週訂單
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
    },
    // 過濾單日訂單
    filtSingleDateOrders () {
      const { year, month, date } = this.calendar
      const singleDateStart = new Date(year, month, date)
      const singleDateEnd = new Date(year, month, date + 1)

      const { orders } = this
      return orders
        .filter(order => {
          const orderDate = order.reserve.from
          return orderDate > singleDateStart && orderDate < singleDateEnd
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
    },
    selectDateHandler (newDate) {
      this.calendar = newDate
      console.log('🚀 ~ selectDateHandler ~ newDate', newDate)
    },
    stepChangeDateHander (step) {
      const newDate = this.calendar.date + step
      const newCalender = new Date(this.calendar.year, this.calendar.month, newDate)
      this.calendar = {
        year: newCalender.getFullYear(),
        month: newCalender.getMonth(),
        date: newCalender.getDate(),
        weekDay: newCalender.getDay()
      }
    }
  }
}
</script>

<style lang="scss" src="./Week.scss"></style>
