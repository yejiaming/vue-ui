<template>
    <div class="picker">
        <div style="text-align: center;margin-top: 30px">
            <button @click="show = true">显示日期date-picker</button>
        </div>
        <date-picker :show="show" @handleDatePicker="handleDatePicker" :daySpan="7"></date-picker>
    </div>
</template>

<script>
    import {datePicker} from '../../components/index';
    export default {
        components: {
            datePicker
        },
        data() {
            return {
                show: false
            }
        },
        methods: {
            handleDatePicker(value){
                this.show = !this.show;
                console.log('选中的时间是', value);
            }
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
