<template>
  <div class="datePicker">
    <div class="datePicker_header">
      <button
        class="datePicker_close"
        @click="closeHandler"
      >
        <i class="fas fa-times" />
      </button>
      <div class="datePicker_title">
        <span class="datePicker_icon"><i class="far fa-calendar text-white" /></span>
        <span class="datePicker_title_content">選擇日期</span>
      </div>
      <!-- 當月標題 -->
      <div class="datePicker_month_title">
        {{ currentMonthLabel.year }} / {{ currentMonthLabel.month }}
      </div>
      <!-- 週標 -->
      <div class="datePicker_weekday">
        <span
          v-for="d in 7"
          :key="84 + d"
          class="datePicker_weekday_label"
        >{{ getWeekday(d-1) }}</span>
      </div>
    </div>
    <div class="datePicker_body">
      <!-- 當月 -->
      <div class="datePicker_month current">
        <div
          v-for="(day, i) in daysOfMonthWithClass"
          :key="i"
          class="datePicker_date"
          :class="{'today': day.isToday, 'disabled': day.disabled, 'selected': day.selected}"
          @click="selectHandler(day)"
          v-text="day.disabled? '': day.date"
        />
      </div>
      <!-- 次月標題 -->
      <div class="datePicker_month_title pt-3">
        {{ nextMonthLabel.year }} / {{ nextMonthLabel.month }}
      </div>
      <!-- 次月 -->
      <div class="datePicker_month next">
        <div
          v-for="(day, i) in daysOfNextMonthWithClass"
          :key="42 + i"
          class="datePicker_date"
          :class="{'today': day.isToday, 'disabled': day.disabled, 'selected': day.selected}"
          @click="selectHandler(day)"
          v-text="day.disabled? '': day.date"
        />
      </div>
    </div>
    <div class="datePicker_select">
      <button
        class="btn btn-primary"
        @click="confirmSelect"
      >
        選擇
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    current: { type: Date, required: true },
    calendar: { type: Object, required: true },
    daysOfMonth: { type: Array, required: true },
    daysOfNextMonth: { type: Array, required: true }
  },
  data () {
    return {
      select: {
        year: 0,
        month: 0,
        date: 0,
        weekDay: 0
      }
    }
  },
  computed: {
    today () {
      const { current } = this
      return {
        year: current.getFullYear(),
        month: current.getMonth(),
        date: current.getDate(),
        weekDay: current.getDay()
      }
    },
    getWeekday () {
      const { daysOfMonth } = this
      const mapDay = {
        1: 'M',
        2: 'T',
        3: 'W',
        4: 'T',
        5: 'F',
        6: 'S',
        0: 'S'
      }
      return (d) => mapDay[daysOfMonth[d].weekDay]
    },
    currentMonth () {
      const { year, month } = this.calendar
      const cDate = new Date(year, month, 1)
      return { year: cDate.getFullYear(), month: cDate.getMonth() }
    },
    currentMonthLabel () {
      const { year, month } = this.currentMonth
      return { year, month: (month + 1).toString().padStart(2, '0') }
    },
    nextMonth () {
      const { year, month } = this.currentMonth
      const mDate = new Date(year, month + 1, 1)
      return { year: mDate.getFullYear(), month: mDate.getMonth() }
    },
    nextMonthLabel () {
      const { year, month } = this.nextMonth
      return { year, month: (month + 1).toString().padStart(2, '0') }
    },
    daysOfMonthWithClass () {
      const { daysOfMonth, select } = this
      const { year, month, date } = this.today
      const currentMonth = this.currentMonth.month
      return daysOfMonth.map(day => {
        const disabled = day.month !== currentMonth
        return {
          ...day,
          disabled,
          selected: !disabled && select.year === day.year && select.month === day.month && select.date === day.date,
          isToday: !disabled && year === day.year && month === day.month && date === day.date
        }
      })
    },
    daysOfNextMonthWithClass () {
      const { daysOfNextMonth, select } = this
      const currentMonth = this.nextMonth.month
      return daysOfNextMonth.map(day => {
        const disabled = day.month !== currentMonth
        return {
          ...day,
          disabled,
          selected: !disabled && select.year === day.year && select.month === day.month && select.date === day.date
        }
      })
    }
  },
  methods: {
    closeHandler () {
      this.$emit('switchPicker', false)
    },
    selectHandler (day) {
      if (day.disabled) return
      const { year, month, date, weekDay } = day
      this.select.year = year
      this.select.month = month
      this.select.date = date
      this.select.weekDay = weekDay
    },
    confirmSelect () {
      if (this.select.year !== 0) {
        this.$emit('changeCalendar', this.select)
      }
      this.closeHandler()
    }
  }
}
</script>

<style lang="scss">
.datePicker {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: #f2f2f2;
  left: 0;
  top: 0;
  &_header {
    background-color: #fff;
  }
  &_close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    border: 0;
    background: transparent;
    font-size: 1.5rem;
  }
  &_title {
    font-weight: 550;
    padding: 1rem;
    text-align: left;
    font-size: 1.2rem;
    vertical-align: middle;
  }
  &_icon {
    margin-right: 0.5rem;
    display: inline-block;
    border-radius: 50%;
    background-color: #7f74b4;
    width: 2rem;
    height: 2rem;
    text-align: center;
    > i {
      vertical-align: middle;
    }
  }
  &_title_content {
    vertical-align: bottom;
  }
  &_weekday {
    display: flex;
    width: calc(90vw - 15px);
    margin: auto;
  }
  &_weekday_label {
    font-weight: 550;
    width: calc((90vw - 15px) / 7);
  }
  &_body {
    height: calc(100vh - 112px);
    padding-bottom: 3.2rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  &_month_title {
    font-weight: 550;
  }
  &_month {
    display: flex;
    flex-wrap: wrap;
    width: calc(90vw - 15px);
    margin: auto;
  }
  &_date {
    width: calc((90vw - 15px) / 7);
    padding: 0.5rem 0.5rem;
    padding-top: 1rem;
    cursor: pointer;
    position: relative;
    text-align: center;
    font-size: 0.8rem;
    color: #838383;
    font-weight: 550;

    &:hover {
      &::before {
        content: "";
        left: calc(50% - 1rem);
        top: 0.5rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: block;
        background-color: #dedaf4;
        position: absolute;
        z-index: -1;
      }
    }
    &.selected {
      color: #fff;
      &::before {
        content: "";
        left: calc(50% - 1rem);
        top: 0.5rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: block;
        background-color: #7f74b4;
        position: absolute;
        z-index: -1;
      }
    }
    &.disabled {
      color: #f2f2f2;
      background-color: #f2f2f2;
      cursor: default;
      &:hover::before {
        display: none;
      }
    }
    &.today::after {
      width: 8px;
      height: 8px;
      left: calc(50% - 4px);
      background-color: #70d9ca;
      position: absolute;
      bottom: -0.75rem;
      border-radius: 50%;
      content: "";
    }
  }
  &_select {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 4.2rem;
    padding-top: 1rem;
    > button {
      width: 9rem;
      border-radius: 10px;
      box-shadow: 0 5px 2px 0px #aaa;
    }
  }
}
</style>
