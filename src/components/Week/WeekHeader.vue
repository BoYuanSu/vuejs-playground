<template>
  <div class="weekHeader">
    <div
      class="weekHeader_col"
      @click="openHandler"
    >
      <span class="weekHeader_icon text-primary"><i class="far fa-calendar" /></span>
    </div>
    <div
      v-for="d in 7"
      :key="'week_day' + d"
      class="weekHeader_col weekHeader_weekday"
      :class="{
        active: isActive(d - 1)
      }"
      @click="setActiveDay(d - 1)"
    >
      <div class="weekHeader_weekday_name">
        {{ getDayName(d - 1) }}
      </div>
      <div class="weekHeader_weekday_label">
        {{ getDate(d - 1) }}
      </div>
      <span :class="{'weekHeader_current': isToday(d-1)}" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeekHeader',
  props: {
    today: { type: Object, required: true },
    calendar: { type: Object, required: true },
    daysOfWeek: { type: Array, required: true }
  },
  data () {
    return { activeDay: 0 }
  },
  computed: {
    getDayName () {
      const { daysOfWeek } = this
      const mapDay = {
        1: 'M',
        2: 'T',
        3: 'W',
        4: 'T',
        5: 'F',
        6: 'S',
        0: 'S'
      }
      return (d) => mapDay[daysOfWeek[d].weekDay]
    },
    getDate () {
      const { daysOfWeek } = this
      return (d) => daysOfWeek[d].date
    },
    isToday () {
      const { today, daysOfWeek } = this
      return d => {
        const day = daysOfWeek[d]
        const { year, month, date } = today
        return day.year === year && day.month === month && day.date === date
      }
    },
    isActive () {
      const { calendar, daysOfWeek } = this
      return d => {
        return daysOfWeek[d].date === calendar.date
      }
    }
  },
  mounted () {
    this.activeDay = this.today.weekDay
  },
  methods: {
    setActiveDay (weekDay) {
      this.activeDay = weekDay
      this.$emit('selectDate', this.daysOfWeek[weekDay])
    },
    openHandler () {
      this.$emit('switchPicker', true)
    }
  }
}
</script>

<style lang="scss">
.weekHeader {
  background: #fff;
  box-shadow: 0 5px 5px #aaaaaa;
  display: flex;
  padding-bottom: 1rem;
  &_icon {
    background-color: #dedaf4;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: block;
    position: relative;
    margin: auto;
    margin-top: 0.5rem;
    > i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &_col {
    width: calc(100% / 8);
    cursor: pointer;
  }
  &_weekday {
    position: relative;
    &.active {
      background-color: #7f75b4;
      color: #fefeff;
      border-radius: 5px;
    }
  }
  &_current {
    width: 8px;
    height: 8px;
    left: calc(50% - 4px);
    background-color: #70d9ca;
    position: absolute;
    bottom: -0.75rem;
    border-radius: 50%;
  }
}
</style>
