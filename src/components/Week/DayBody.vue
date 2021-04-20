<template>
  <div class="dayBody">
    <!-- 時間軸 -->
    <div class="dayBody_col dayBody_labels">
      <div
        v-for="t in 24"
        :key="'label' + t"
        class="dayBody_row dayBody_label"
      >
        <span>{{ getTime(t) }}</span>
      </div>
    </div>
    <div class="dayBody_col dayBody_time">
      <!-- 現在時間 PIN 針 -->
      <span
        class="pin"
        :class="{ active: isToday }"
        :style="{ top: pinTop + 'px' }"
      />
      <!-- 顯示排班 -->
      <div
        v-for="schedule in schedulesWithStyle"
        :key="schedule.id"
        class="dayBody_schedule"
        :style="schedule.style"
      />
      <!-- 顯示預約事件 -->
      <div
        v-for="order in ordersWithStyle"
        :key="order.id"
        class="dayBody_order"
        :style="order.style"
      >
        <span class="dayBody_order_name">
          {{ order.name }}
        </span>
        <span class="dayBody_order_user">
          {{ order.user }}
        </span>
      </div>
      <div
        v-for="t in 24"
        :key="'week_time' + t"
        class="dayBody_row weekBody_label"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayBody',
  props: {
    current: { type: Date, required: true },
    calendar: { type: Object, required: true },
    schedules: { type: Array, required: true },
    orders: { type: Array, required: true },
    use12Hour: { type: Boolean, default: true }
  },
  computed: {
    getTime () {
      const { use12Hour } = this
      return (t) => {
        if (use12Hour) {
          return t > 12 ? `${t % 12}:00pm` : `${t}:00am`
        }
        return `${t}:00`
      }
    },
    pinTop () {
      const { current } = this
      const oneDay = 24 * 60 * 60
      const totalSec = current.getSeconds() + 60 * current.getMinutes() + 60 * 60 * current.getHours()
      const todayMinisec = (totalSec % oneDay)
      return todayMinisec * 70 * 24 / oneDay
    },
    isToday () {
      const { calendar, current } = this
      const { year, month, date } = calendar
      return current.getFullYear() === year && current.getMonth() === month && current.getDate() === date
    },
    // 處理當日訂單的樣式
    ordersWithStyle () {
      const { orders } = this
      const oneDay = 24 * 60 * 60
      const HeightPerHour = 70

      return orders
        .map(order => {
          const { from, to } = order.reserve
          const height = (to - from) * HeightPerHour / (60 * 60 * 1000)
          const totalSec = from.getSeconds() + 60 * from.getMinutes() + 60 * 60 * from.getHours()
          const top = (totalSec % oneDay) * HeightPerHour * 24 / oneDay
          return {
            ...order,
            style: {
              height: height + 'px',
              top: top + 'px'
            }
          }
        })
    },
    // 處理當日排班的樣式
    schedulesWithStyle () {
      const { schedules } = this
      const oneDay = 24 * 60 * 60
      const HeightPerHour = 70

      return schedules
        .map(schedule => {
          const { from, to } = schedule.online
          const height = (to - from) * HeightPerHour / (60 * 60 * 1000)
          const totalSec = from.getSeconds() + 60 * from.getMinutes() + 60 * 60 * from.getHours()
          const top = (totalSec % oneDay) * HeightPerHour * 24 / oneDay
          return {
            ...schedule,
            style: {
              height: height + 'px',
              top: top + 'px'
            }
          }
        })
    }
  }
}
</script>

<style lang="scss">
$border: #d4d5d6;
$pinColor: #757575;
$orderBg: #e5e5e5;
$orderBg: rgba(229, 229, 229, 0.7);
$scheduleBg: rgba(246, 246, 246, 0.5);

.dayBody {
  height: 100%;
  display: flex;
  overflow: auto;
  display: flex;
  &::-webkit-scrollbar {
    width: 0;
  }
  &_row {
    height: 70px;
    border-right: 1px solid $border;
    border-bottom: 1px solid $border;
  }
  &_labels {
    width: calc(100% / 8);
  }
  &_label {
    font-size: 10px;
    position: relative;
    > * {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &_time {
    position: relative;
    width: calc(100% * 7 / 8);
  }
  &_order {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1;
    width: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    font-size: 0.8rem;
    text-align: left;
    background-color: $orderBg;
    cursor: pointer;
  }
  &_schedule {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1;
    width: 100%;
    padding: 0.5rem;
    font-size: 0.8rem;
    text-align: left;
    background-color: $scheduleBg;
    cursor: pointer;
  }
  &_order_user {
    color: #98999a;
  }
  .pin {
    width: 100%;
    height: 1px;
    background-color: $pinColor;
    position: absolute;
    top: 200px;
    left: 0;
    z-index: 2;

    &:not(.active) {
      display: none;
    }
    &::before,
    &.active:before {
      position: absolute;
      background-color: $pinColor;
      right: calc(100% - 5px);
      top: -5px;
      border-radius: 50%;
      display: block;
      content: " ";
      width: 10px;
      height: 10px;
    }
  }
}
</style>
