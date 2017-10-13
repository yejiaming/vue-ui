<template>
  <div class="picker">
    <div style="text-align: center;margin-top: 30px">
      <button @click="showDate = true">显示日期picker</button>
    </div>
    <picker-first-edition :show="showDate" @pickerClick="showPicker" :formatValue="formatValue"></picker-first-edition>
  </div>
</template>

<script>
  import {pickerFirstEdition} from '../../components/index';
  export default {
    components: {
      pickerFirstEdition
    },
    data() {
      return {
        showDateAAA:'111111',
        showDate: false,
        showDateTime: false,
        showTime: false,
      }
    },
    methods: {
      showPicker(action, value){
        console.log(new Date(value));
        if (action) {
          this.showDate = false;
        } else {
          this.showDate = false;
        }
      },
      showDateTimePicker(action, value){
        if (action) {
          this.showDateTime = false;
        } else {
          this.showDateTime = false;
        }
      },
      formatValue(index,value){
        if(index === 0) {
          return value;
        }else {
          return value;
        }
      },
      showTimePicker(action, value){
        if (action) {
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
