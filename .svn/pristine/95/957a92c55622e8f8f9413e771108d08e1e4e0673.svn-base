<template>
    <div class="date-picker" v-show="showFlag" @click.self="cancel()">
        <div class="picker-warp" :class="{'show-animation':animateFlag,'hidden-animation':!animateFlag}">
            <div class="header-ctrl">
                <span class="tf" @click="cancel()">{{cancelText}}</span>
                <span class="tr" @click="confirm()">{{confirmText}}</span>
            </div>
            <picker @handlePicker="handlePicker" :slots="slots" type="custom-custom-custom" :formatValue="formatValue"
                    :showTitle="false"></picker>
        </div>
    </div>
</template>
<script>
    import picker from '../../picker/index';
    export default {
        name: 'date-picker',
        components: {
            picker
        },
        props: {
            /*显示隐藏标志*/
            show: {
                type: Boolean,
                default: false
            },
            /*取消的text*/
            cancelText: {
                type: String,
                default: '取消'
            },
            /*确定的text*/
            confirmText: {
                type: String,
                default: '确定'
            },
            /*终止天数跨度，按照起始日期算，往后延几天终止，默认是7天之内的，最大的是离现在的30天之内*/
            daySpan: {
                type: Number,
                default: 7
            },
        },
        data(){
            return {
                /*显示或隐藏picker组件*/
                showFlag: this.show,
                /*动画切换标志*/
                animateFlag: true,
                slots: [
                    [],
                    [],
                    [],
                ],
                chinaDay: ['今天', '明天', '后天'],
                chinaNow: ['现在'],
                minute: ['00', '10', '20', '30', '40', '50',]
            };
        },
        beforeMount(){
            let startDate = new Date();
            var count = this.daySpan;
            for (let i = 0; i < count; i++) {
                var diffDate = this.getDiffDate(startDate, i);
                var month = diffDate.getMonth() + 1;
                var day = diffDate.getDate();
                this.slots[0].push(this.chinaDay[i] || month + '月' + day + '日');
            }

            var nowHour = new Date().getHours();
            var hour = 23 - nowHour;
            this.slots[1].push(this.chinaNow[0]);
            for (let j = 0; j < hour; j++) {
                this.slots[1].push(nowHour + j);
            }
        },
        watch: {
            show(val) {
                if (!val) {
                    this.animateFlag = false;
                    /*displayNone是没有动画效果的，所以只能先设置动画效果再设置display:none*/
                    this.$el.querySelector('.picker-warp').addEventListener('animationend', (e) => {
                        if (!this.animateFlag) {
                            this.showFlag = false;
                        }
                    });
                } else {
                    this.animateFlag = true;
                    this.showFlag = true;
                }
            }
        },
        methods: {
            /*返回多少天之后的日期*/
            getDiffDate(date, days) {
                date = date == undefined ? new Date() : date;
                typeof date == 'string' && (date = date.replace(/\ /g, "T")); // 目的是解决IOS时间问题
                date = (typeof date == 'number' || typeof date == 'string') ? new Date(date) : date;
                days = days == undefined ? 30 : days * 1;
                return new Date(Date.parse(date) + days * 24 * 1000 * 3600);
            },
            formatValue(index, value){
                if (index === 1) {
                    return value != '现在' ? value + '点' : value;
                } else if (index === 2) {
                    return value + '分';
                }
            },
            handlePicker(value, index){
                console.log(value);
                if(index ===0) {

                }else if(index === 1) {

                }else {

                }
            },
            /*取消*/
            cancel() {
                this.$emit('handleDatePicker');
            },
            /*确定*/
            confirm() {
                this.$emit('handleDatePicker', this.currentValue);
            }
        }
    };
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "./style.less";
</style>
