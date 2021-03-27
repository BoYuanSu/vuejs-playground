<template>
  <div class="weekBody">
    <!-- 時間軸 -->
    <div class="weekBody_col weekBody_labels">
      <div
        v-for="t in 24"
        :key="'label' + t"
        class="weekBody_row weekBody_label"
      >
        <span>{{ getTime(t) }}</span>
      </div>
    </div>
    <!-- 展開時間與日期 -->
    <div
      v-for="d in 7"
      :key="'week_day' + d"
      class="weekBody_col weekBody_week_day"
    >
      <!-- 現在時間 PIN 針 -->
      <span
        class="pin"
        :class="{ active: d === today.getDay() }"
        :style="{ top: pinTop + 'px' }"
      />
      <!-- 顯示預約事件 -->
      <div
        v-for="order in orderFilters(d)"
        :key="order.id"
        class="weekBody_order"
        :style="order.style"
      >
        <span class="weekBody_order_name">
          {{ order.name }}
        </span>
      </div>
      <div
        v-for="t in 24"
        :key="'week_time' + t"
        class="weekBody_row weekBody_label"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeekBody',
  props: {
    today: { type: Date, required: true },
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
      const { today } = this
      const oneDay = 24 * 60 * 60
      const totalSec = today.getSeconds() + 60 * today.getMinutes() + 60 * 60 * today.getHours()
      const todayMinisec = (totalSec % oneDay)
      return todayMinisec * 70 * 24 / oneDay
    },
    // 本週起始日
    getStartWeekDate () {
      const weekDay = this.today.getDay()
      const todayDate = this.today.getDate()
      return todayDate - weekDay + 1
    },
    ordersWithStyle () {
      const { orders } = this
      const oneDay = 24 * 60 * 60

      return orders
        .map(order => {
          const { from, to } = order.reserve
          const height = (to - from) * 70 * 24 / oneDay / 1000
          const totalSec = from.getSeconds() + 60 * from.getMinutes() + 60 * 60 * from.getHours()
          const top = (totalSec % oneDay) * 70 * 24 / oneDay
          return {
            ...order,
            style: {
              height: height + 'px',
              top: top + 'px'
            }
          }
        })
    },
    orderFilters () {
      const { ordersWithStyle } = this
      return (weekDay) => {
        return ordersWithStyle
          .filter(order => {
            const orderDate = order.reserve.from.getDate()
            return weekDay + this.getStartWeekDate - 1 === orderDate
          })
      }
    }
  }
}
</script>

<style lang="scss">
$border: #d4d5d6;
$pinColor: #757575;
$orderBg: #e5e5e5;
$orderBg: rgba(229, 229, 229, 0.7);

.weekBody {
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: stretch;

  &::-webkit-scrollbar {
    width: 0;
  }
  &_col {
    width: calc(100% / 8);
  }
  &_row {
    height: 70px;
    border-right: 1px solid $border;
    border-bottom: 1px solid $border;
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
  &_week_day {
    position: relative;
  }
  &_order {
    position: absolute;
    background-color: $orderBg;
    width: 100%;
    border-radius: 10px;
    z-index: 1;
    text-align: left;
    padding: 0.5rem;
    font-size: 0.8rem;
  }
  &_order_name {
    font-weight: 550;
  }
  .pin {
    width: 100%;
    height: 1px;
    background-color: $pinColor;
    position: absolute;
    top: 200px;
    left: 0;
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
