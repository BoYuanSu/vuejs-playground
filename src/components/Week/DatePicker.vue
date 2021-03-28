<template>
  <div class="datePicker">
    <div class="datePicker_header">
      <button class="datePicker_close">
        <i class="fas fa-times" />
      </button>
      <div class="datePicker_title">
        <span class="datePicker_icon"><i class="far fa-calendar text-white" /></span>
        <span class="datePicker_title_content">選擇日期</span>
      </div>
      <div class="datePicker_month_title">
        2020 / 06
      </div>
      <div class="datePicker_weekday">
        <span
          v-for="i in 7"
          :key="70 + i"
          class="datePicker_weekday_label"
        >{{ i }}</span>
      </div>
    </div>
    <div class="datePicker_body">
      <div class="datePicker_month current">
        <div
          v-for="i in 35"
          :key="i"
          class="datePicker_date today"
        >
          {{ i }}
        </div>
      </div>
      <div class="datePicker_month_title pt-3">
        2020 / 07
      </div>

      <div class="datePicker_month next">
        <div
          v-for="i in 35"
          :key=" 35 + i"
          class="datePicker_date"
        >
          {{ i }}
        </div>
      </div>
    </div>
    <div class="datePicker_select">
      <button class="btn btn-primary">
        選擇
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {

  },
  computed: {}
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
    width: 90vw;
    margin: auto;
  }
  &_weekday_label {
    width: calc(90vw / 7);
  }
  &_body {
    height: calc(100vh - 112px);
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
    width: 90vw;
    margin: auto;
  }
  &_date {
    width: calc(90vw / 7);
    padding: 1rem;
    cursor: pointer;
    position: relative;

    &:hover {
      &::before {
        content: "";
        left: calc(50% - 1rem);
        top: calc(50% - 1rem);
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
        top: calc(50% - 1rem);
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: block;
        background-color: #7f74b4;
        position: absolute;
        z-index: -1;
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
    > button {
      width: 9rem;
      border-radius: 10px;
      box-shadow: 0 5px 2px 0px #aaa;
    }
  }
}
</style>
