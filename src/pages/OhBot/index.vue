<template>
  <div class="ohBot">
    <div class="ohBot_header">
      <div class="ohBot_title">
        <span> 預約行事曆 </span>
      </div>
      <div class="ohBot_switch">
        <b-dropdown
          :text="mode+'檢視'"
          class="mr-3"
        >
          <b-dropdown-item @click="SET_MODE('週')">
            週
          </b-dropdown-item>
          <b-dropdown-item @click="SET_MODE('日')">
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
      <Week :orders="orders" />
    </div>
    <div class="ohBot_reserve">
      <button class="btn btn-primary px-5">
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
      mode: '週',
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
      ]
    }
  },
  methods: {
    SET_MODE (mode) {
      this.mode = mode
    }
  }
}
</script>

<style lang="scss" src="./OhBot.scss"></style>
