<template>
  <div class="weekHeader">
    <div class="weekHeader_col">
      <span class="weekHeader_icon text-primary"><svg
        id="fi_2948239"
        enable-background="new 0 0 512 512"
        height="16"
        viewBox="0 0 512 512"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      ><g><path d="m446 40h-46v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-224v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-46c-36.393 0-66 29.607-66 66v340c0 36.393 29.607 66 66 66h380c36.393 0 66-29.607 66-66v-340c0-36.393-29.607-66-66-66zm34 406c0 18.778-15.222 34-34 34h-380c-18.778 0-34-15.222-34-34v-265c0-2.761 2.239-5 5-5h438c2.761 0 5 2.239 5 5z" /></g></svg></span>
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
