<template>
  <div class="weekHeader">
    <div class="weekHeader_col">
      <i>icon</i>
    </div>
    <div
      v-for="d in 7"
      :key="'week_day' + d"
      class="weekHeader_col weekHeader_weekday"
      :class="{
        active: activeDay === d
      }"
      @click="setActiveDay(d)"
    >
      <div class="weekHeader_weekday_name">
        {{ getDayName(d) }}
      </div>
      <div class="weekHeader_weekday_label">
        {{ getDay(d) }}
      </div>
      <span :class="{'weekHeader_current': d === currentDay}" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeekHeader',
  props: {
    today: { type: Date, required: true },
    currentDate: { type: Number, required: true },
    currentWeekDay: { type: Number, required: true },
    startWeekOn: { type: Number, default: 1 }

  },
  data () {
    return { activeDay: 0 }
  },
  computed: {
    getDayName () {
      const mapDay = {
        1: 'M',
        2: 'T',
        3: 'W',
        4: 'T',
        5: 'F',
        6: 'S',
        0: 'S'
      }

      return (d) => {
        const readDay = this.getDay(d)
        return mapDay[readDay % 7]
      }
    },
    getDay () {
      const { startWeekOn } = this
      return (d) => {
        const real = (d + startWeekOn - 1) % 7
        return this.currentDate - this.currentWeekDay + (real === 0 ? 7 : real)
      }
    },
    currentDay () {
      return this.today.getDay()
    },
    days () {
      const { today, currentDay, startWeekOn } = this
      const oneDay = 24 * 60 * 60 * 1000
      const weekStart = new Date(today - (currentDay - startWeekOn) * oneDay)
      return new Date(weekStart)
    }
  },
  mounted () {
    this.activeDay = this.currentWeekDay
  },
  methods: {
    setActiveDay (weekDay) {
      this.activeDay = weekDay
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
