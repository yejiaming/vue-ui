<template>
  <div class="picker">
    <div style="text-align: center;margin-top: 30px">
      <button @click="showDate = true">显示日期picker</button>
    </div>
    <div style="text-align: center;margin-top: 30px">
      <button @click="showDateTime = true">显示日期时间picker</button>
    </div>
    <div style="text-align: center;margin-top: 30px">
      <button @click="showTime = true">显示时间picker</button>
    </div>
    <picker :show="showDate" @pickerClick="showPicker"></picker>
    <picker :show="showDateTime" @pickerClick="showDateTimePicker"></picker>
    <picker :show="showTime" @pickerClick="showTimePicker"></picker>
  </div>
</template>

<script>
  import {picker} from '../../components/index';
  export default {
    components: {
      picker
    },
    data() {
      return {
        showDate: false,
        showDateTime: false,
        showTime: false,
      }
    },
    methods: {
      showPicker(action, value){
        if (action) {
          this.showDate = false;
        } else {
          this.showDate = false;
        }
      },
      showDateTimePicker(action, value){
        if (action) {
          confirm(value);
          this.showDateTime = false;
        } else {
          this.showDateTime = false;
        }
      },
      showTimePicker(action, value){
        if (action) {
          confirm(value);
          this.showTime = false;
        } else {
          this.showTime = false;
        }
      },
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .picker {
    text-align: center;
    padding: 10px;
    button {
      padding: 10px;
    }
  }
</style>
