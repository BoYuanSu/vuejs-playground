<template>
  <div class="ohBot">
    <div class="ohBot_header">
      <div class="ohBot_title">
        <span v-show="mode === '週' "> 預約行事曆 </span>
        <div
          v-show="mode === '日' "
          class="ohBot_control"
        >
          <button
            class="ohBot_control_btn prev"
            @click="changeDate(-1)"
          >
            <i class="fas fa-chevron-left" />
          </button>
          <span>{{ '2021 / 00 / 27' }}</span>
          <button
            class="ohBot_control_btn next"
            @click="changeDate(+1)"
          >
            <i class="fas fa-chevron-right" />
          </button>
        </div>
      </div>
      <div class="ohBot_switch">
        <b-dropdown
          :text="mode+'檢視'"
          class="mr-3"
        >
          <b-dropdown-item @click="setMode('週')">
            週
          </b-dropdown-item>
          <b-dropdown-item @click="setMode('日')">
            日
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown
          text="測試"
          pill
        >
          <b-dropdown-item>測試</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <div class="ohBot_body">
      <Week
        ref="week"
        :mode="mode"
        :orders="orders"
        :schedules="schedules"
      />
    </div>
    <div class="ohBot_reserve">
      <button class="btn btn-primary">
        新增預約
      </button>
    </div>
  </div>
</template>

<script>
import Week from '@/components/Week'
export default {
  name: 'OhBot',
  components: {
    Week
  },
  data () {
    return {
      mode: '日',
      // 預約
      orders: [
        {
          id: '1',
          name: '美甲保養1',
          user: '王小美',
          reserve: {
            from: new Date(2021, 2, 22, 8, 30),
            to: new Date(2021, 2, 22, 9, 30)
          }
        },
        {
          id: '2',
          name: '美甲保養2',
          user: '王大美',
          reserve: {
            from: new Date(2021, 2, 26, 15, 30),
            to: new Date(2021, 2, 26, 19, 30)
          }
        },
        {
          id: '3',
          name: '美甲保養3',
          user: '王中美',
          reserve: {
            from: new Date(2021, 3, 1, 15, 30),
            to: new Date(2021, 3, 1, 19, 30)
          }
        }
      ],
      // 排班
      schedules: [
        {
          id: 's2',
          name: '',
          online: {
            from: new Date(2021, 2, 22, 9, 0),
            to: new Date(2021, 2, 22, 17, 0)
          }
        },
        {
          id: 's2',
          name: '',
          online: {
            from: new Date(2021, 3, 26, 9, 0),
            to: new Date(2021, 3, 26, 17, 0)
          }
        },
        {
          id: 's1',
          name: '',
          online: {
            from: new Date(2021, 3, 1, 9, 0),
            to: new Date(2021, 3, 1, 17, 0)
          }
        }
      ],
      calendar: {

      }
    }
  },
  computed: {

  },
  methods: {
    setMode (mode) {
      this.mode = mode
    },
    changeDate (step) {
      this.$refs.week.stepChangeDateHander(step)
    },
    currendCalendar () {
      const { year, month, date } = this.$refs.week?.calendar || {}
      console.log('🚀 ~ currendCalendar ~ this.$refs.week', this.$refs.week)
      return `${year}/${month}/${date}`
    }
  }
}
</script>

<style lang="scss" src="./OhBot.scss"></style>
