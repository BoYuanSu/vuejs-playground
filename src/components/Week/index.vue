<template>
  <div class="week">
    <div class="week_container_header">
      <WeekHeader
        :today="today"
        :days-of-week="daysOfWeek"
        :calendar="bodyComponent === 'DayBody' ? observeCanlendar: {}"
        @selectDate="selectDateHandler"
        @switchPicker="setShowPicker"
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
        :schedules="filtSchedules"
      />
      <DayBody
        v-if="bodyComponent === 'DayBody'"
        key="DayBody"
        :current="current"
        :calendar="observeCanlendar"
        :orders="filtSingleDateOrders"
        :schedules="filtSingleDateSchedules"
      />
    </transition-group>
    <transition name="fade">
      <DatePicker
        v-if="showPicker"
        :current="current"
        :calendar="observeCanlendar"
        :days-of-month="daysOfMonth"
        :days-of-next-month="daysOfNextMonth"
        @switchPicker="setShowPicker"
        @changeCalendar="setCalendar"
      />
    </transition>
  </div>
</template>

<script>
import WeekHeader from './WeekHeader'
import WeekBody from './WeekBody'
import DayBody from './DayBody'
import DatePicker from './DatePicker'

let timer = null
export default {
  name: 'Week',
  components: {
    WeekHeader,
    WeekBody,
    DayBody,
    DatePicker
  },
  props: {
    mode: { type: String, required: true },
    calendar: { type: Object, required: true },
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
      startWeekDay: 1,
      showPicker: false
    }
  },
  computed: {
    observeCanlendar: {
      get () {
        return this.calendar
      },
      set (newCalendar) {
        const newDate = new Date(newCalendar.year, newCalendar.month, newCalendar.date)
        this.$emit('update:calendar', {
          year: newDate.getFullYear(),
          month: newDate.getMonth(),
          date: newDate.getDate(),
          weekDay: newDate.getDay()
        })
      }
    },
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
      let { year, month, date, weekDay } = this.observeCanlendar
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
    firstDateOfMonth () {
      const { year, month } = this.observeCanlendar
      const firstDate = new Date(year, month, 1)
      return {
        year: firstDate.getFullYear(),
        month: firstDate.getMonth(),
        date: firstDate.getDate(),
        weekDay: firstDate.getDay()
      }
    },
    firstDateOfCanlender () {
      let { year, month, date, weekDay } = this.firstDateOfMonth
      weekDay = weekDay || 7
      const firstDate = new Date(year, month, date - weekDay + this.startWeekDay)
      return {
        year: firstDate.getFullYear(),
        month: firstDate.getMonth(),
        date: firstDate.getDate(),
        weekDay: firstDate.getDay()
      }
    },
    daysOfMonth () {
      const days = []
      const { year, month, date } = this.firstDateOfCanlender
      const { month: currentMonth } = this.firstDateOfMonth
      let day = null
      let i = 0
      for (i; i < 42; i++) {
        day = new Date(year, month, date + i)
        days.push({
          year: day.getFullYear(),
          month: day.getMonth(),
          date: day.getDate(),
          weekDay: day.getDay()
        })
      }
      return days.filter((day, i) => {
        return day.month <= currentMonth
      })
    },
    firstDateOfNextMonth () {
      const { year, month } = this.observeCanlendar
      const firstDate = new Date(year, month + 1, 1)
      return {
        year: firstDate.getFullYear(),
        month: firstDate.getMonth(),
        date: firstDate.getDate(),
        weekDay: firstDate.getDay()
      }
    },
    firstDateOfNextCanlender () {
      let { year, month, date, weekDay } = this.firstDateOfNextMonth
      weekDay = weekDay || 7
      const firstDate = new Date(year, month, date - weekDay + this.startWeekDay)
      return {
        year: firstDate.getFullYear(),
        month: firstDate.getMonth(),
        date: firstDate.getDate(),
        weekDay: firstDate.getDay()
      }
    },
    daysOfNextMonth () {
      const days = []
      const { year, month, date } = this.firstDateOfNextCanlender
      const { month: currentMonth } = this.firstDateOfNextMonth
      let day = null
      let i = 0
      for (i; i < 42; i++) {
        day = new Date(year, month, date + i)
        days.push({
          year: day.getFullYear(),
          month: day.getMonth(),
          date: day.getDate(),
          weekDay: day.getDay()
        })
      }
      return days.filter((day, i) => {
        return day.month <= currentMonth
      })
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
      const { year, month, date } = this.observeCanlendar
      const singleDateStart = new Date(year, month, date)
      const singleDateEnd = new Date(year, month, date + 1)

      const { orders } = this
      return orders
        .filter(order => {
          const orderDate = order.reserve.from
          return orderDate > singleDateStart && orderDate < singleDateEnd
        })
    },
    // 過濾當週排班
    filtSchedules () {
      const { firstDateOfWeek, lastDateOfWeek } = this
      const first = new Date(firstDateOfWeek.year, firstDateOfWeek.month, firstDateOfWeek.date)
      const last = new Date(lastDateOfWeek.year, lastDateOfWeek.month, lastDateOfWeek.date)

      const { schedules } = this
      return schedules
        .filter(schedule => {
          const scheduleDate = schedule.online.from
          return scheduleDate > first && scheduleDate < last
        })
    },
    // 過濾當日排班
    filtSingleDateSchedules () {
      const { year, month, date } = this.observeCanlendar
      const singleDateStart = new Date(year, month, date)
      const singleDateEnd = new Date(year, month, date + 1)

      const { schedules } = this
      return schedules
        .filter(schedule => {
          const scheduleDate = schedule.online.from
          return scheduleDate > singleDateStart && scheduleDate < singleDateEnd
        })
    }
  },
  created () {
    const { current } = this
    this.observeCanlendar = {
      year: current.getFullYear(),
      month: current.getMonth(),
      date: current.getDate(),
      weekDay: current.getDay()
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
      this.observeCanlendar = newDate
    },
    stepChangeDateHander (step) {
      const newDate = this.observeCanlendar.date + step
      const newCalender = new Date(this.observeCanlendar.year, this.observeCanlendar.month, newDate)
      this.observeCanlendar = {
        year: newCalender.getFullYear(),
        month: newCalender.getMonth(),
        date: newCalender.getDate(),
        weekDay: newCalender.getDay()
      }
    },
    setShowPicker (show) {
      this.showPicker = show
    },
    setCalendar (newCalendar) {
      this.observeCanlendar = newCalendar
    }
  }
}
</script>

<style lang="scss" src="./Week.scss"></style>
