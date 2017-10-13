<template>
    <div class="picker" v-show="showFlag" @click.self="cancel()">
        <div class="picker-warp" :class="{'show-animation':animateFlag,'hidden-animation':!animateFlag}">
            <div class="header-ctrl">
                <span class="tf" @click="cancel()">{{cancelText}}</span>
                <span class="tr" @click="confirm()">{{confirmText}}</span>
            </div>
            <div class="main-content-mask">
                <div class="main-content">
                    <div class="contents" v-for="pickers,$index in getPickerArray">
                        <div class="content">
                            <div class="flex-left"
                                 :style="{transitionDuration: startMoveFlag?'0ms':'1000ms',webkitTransform: 'translateY('+ defaultOldY*2 +'em)'}">
                                <div v-for="picker in pickers" class="row">{{formatValue && formatValue($index,picker)
                                    || picker}}
                                </div>
                            </div>
                            <div class="flex-right" v-if="showRightTitle">
                                <div>{{gagArray[$index]}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="picker-center-light"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'picker',
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
            /*类型*/
            type: {
                type: String,
                default: '年-月-日'
            },
            /*初始化时显示日期*/
            current: {
                type: Date,
                default: function () {
                    return new Date();
                }
            },
            /*是否展示月，年，日这种的小标题*/
            showTitle: {
                type: Boolean,
                default: true
            },
            /*开始日期*/
            startDate: {
                type: Date,
            },
            /*终止日期，按照起始日期算，往后延到该日期终止*/
            endDate: {
                type: Date,
            },
            /*终止天数跨度，按照起始日期算，往后延几天终止*/
            daySpan: {
                type: Number
            },
            /*格式化值，会传一个index，以及value值过去*/
            formatValue: {
                type: Function
            }
        },
        data(){
            return {
                /*显示或隐藏picker组件*/
                showFlag: this.show,
                /*动画切换标志*/
                animateFlag: true,
                startYear: 1990,
                endYear: 2025,
                startMonth: 1,
                endMonth: 12,
                startDay: 1,
                endDay: 31,
                startHour: 0,
                endHour: 23,
                startMinute: 0,
                endMinute: 60,
                defaultOldY: 2,
                /*循环的数组值对象*/
                pickerArray: [],
                /*循环的数组的标题对象*/
                gagArray: [],
                /*起始位置*/
                startY: 0,
                /*当前位置*/
                currentY: 0,
                /*历史移动的位置*/
                oldY: 0,
                /*touch对应的节点*/
                touchTarget: null,
                /*位移距离*/
                distance: 0,
                /*em和px换算因子，越大移动的越缓慢，越小移动一次的距离越快*/
                factor: 25,
                /*缓动因子*/
                slowMoveFactor: 0.003,
                /*是否移动中的标志*/
                startMoveFlag: false,
                /*当前值*/
                currentValue: this.current,
                /*时间差*/
                diffTime: 0,
                /*移动到最高点的时间*/
                moveTime: 0,
                /*存储三个数据*/
                cacheThree: [],
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
        computed: {
            /*是否展示年-月-日这样的title*/
            showRightTitle() {
                return this.showTitle;
            },
            /*监听设置pickArray*/
            getPickerArray() {
                return this.pickerArray;
            }
        },
        beforeMount() {
            this.init();
        },
        mounted() {
            this.addTouchEvent();
            this.changeCurrent();
        },
        methods: {
            /*通过日期年-月，获取天数*/
            getDaysInMonth(year, month) {
                month = parseInt(month, 10);
                var d = new Date(year, month, 0);
                return d.getDate();
            },
            /*获取目标touch目标节点*/
            getTargetEl(element) {
                let currentNode = element;
                while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                    if (currentNode.className && currentNode.classList.contains("flex-left")) {
                        return currentNode;
                    }
                    currentNode = currentNode.parentNode;
                }
                console.error("未找到类名称是：" + className + "的节点");
                return null;
            },
            /*初始化数据*/
            init() {
                var types = this.type.split('-');
                for (var i = 0, len = types.length; i < len; i++) {
                    this.pickerArray.push([]);
                    switch (types[i]) {
                        case "年": // 日期
                            for (let year = Number(this.startYear), end = Number(this.endYear); year <= end; year++) {
                                this.pickerArray[i].push(year);
                            }
                            this.gagArray[i] = '年';
                            break;
                        case "月":
                            for (let month = Number(this.startMonth), end = Number(this.endMonth); month <= end; month++) {
                                this.pickerArray[i].push(month);
                            }
                            this.gagArray[i] = '月';
                            break;
                        case "日":
                            for (let day = Number(this.startDay), end = Number(this.endDay); day <= end; day++) {
                                this.pickerArray[i].push(day);
                            }
                            this.gagArray[i] = '日';
                            break;
                        case "时":
                            for (let hour = Number(this.startHour), end = Number(this.endHour); hour <= end; hour++) {
                                this.pickerArray[i].push(hour);
                            }
                            this.gagArray[i] = '时';
                            break;
                        case "分":
                            for (let minute = Number(this.startMinute), end = Number(this.endMinute); minute <= end; minute++) {
                                if (minute < 10) {
                                    this.pickerArray[i].push('0' + minute);
                                } else {
                                    this.pickerArray[i].push(minute);
                                }
                            }
                            this.gagArray[i] = '分';
                            break;
                        case "省":
                            break;
                        case "市":
                            break;
                        case "县":
                    }
                }
            },
            /*给每一个flex-left添加touch监听事件*/
            addTouchEvent() {
                let els = Array.prototype.slice.call(this.$el.querySelectorAll(".flex-left"));
                if (els instanceof Array) {
                    for (let i = 0, len = els.length; i < len; i++) {
                        els[i].addEventListener('touchstart', this.handleTouchStart);
                        els[i].addEventListener('touchmove', this.handleTouchMove);
                        els[i].addEventListener('touchend', this.handleTouchEnd);
                    }
                }
            },
            /*移动到当前数据节点*/
            changeCurrent() {
                var types = this.type.split('-');
                var data = this.$el.querySelectorAll('.flex-left');
                for (var i = 0, len = types.length; i < len; i++) {
                    switch (types[i]) {
                        case "年": // 日期
                            var countYear = Number(this.currentValue.getFullYear()) - Number(this.startYear);
                            this.translateYCount(data[i], -countYear + this.defaultOldY);
                            this.changeDays(this.getDaysInMonth(this.currentValue.getFullYear(), this.currentValue.getMonth() + 1));
                            break;
                        case "月":
                            var countMonth = Number(this.currentValue.getMonth() + 1) - Number(this.startMonth);
                            this.translateYCount(data[i], -countMonth + this.defaultOldY);
                            this.changeDays(this.getDaysInMonth(this.currentValue.getFullYear(), this.currentValue.getMonth() + 1));
                            break;
                        case "日":
                            var countDay = Number(this.currentValue.getDate()) - Number(this.startDay);
                            this.translateYCount(data[i], -countDay + this.defaultOldY);
                            break;
                        case "时":
                            var countHour = Number(this.currentValue.getHours()) - Number(this.startHour);
                            this.translateYCount(data[i], -countHour + this.defaultOldY);
                            break;
                        case "分":
                            var countMinute = Number(this.currentValue.getMinutes()) - Number(this.startMinute);
                            this.translateYCount(data[i], -countMinute + this.defaultOldY);
                            break;
                        case "省":
                            break;
                        case "市":
                            break;
                        case "县":
                    }
                }
            },
            /*移动dom节点多少个count，count可以为正和负，分别代表上下方向*/
            translateYCount(dom, count) {
                dom.style["-webkit-transform"] = 'translateY(' + count * 2 + 'em)';
            },
            /*改变year或者month的时候都需要同步改变天数*/
            changeDays(count) {
                var types = this.type.split('-');
                var data = this.$el.querySelectorAll('.flex-left');
                for (var i = 0, len = types.length; i < len; i++) {
                    switch (types[i]) {
                        case "日":
                            var arr = this.pickerArray;
                            this.pickerArray = [];
                            arr[i] = [];
                            for (var num = 1; num <= count; num++) {
                                arr[i].push(num);
                            }
                            this.pickerArray = arr;
                            break;
                        case "省":
                            break;
                        case "市":
                            break;
                        case "县":
                    }
                }
            },
            /*得到当前移动的是什么节点的下标*/
            getCurrentNodeIndex(dom) {
                let els = Array.prototype.slice.call(this.$el.querySelectorAll(".flex-left"));
                var index;
                els.forEach((node, i) => {
                    if (node === dom) {
                        index = i;
                    }
                });
                return index;
            },
            /*获取dom节点的translateY的值*/
            getTranslateY(dom) {
                var transformString = dom.style.transform;
                if (transformString) {
                    return Number(transformString.match(/\+?\-?\d+/g)[0]);
                } else {
                    return 0;
                }
            },
            /*添加缓存数据，路程和时间*/
            addCacheThree(s, t) {
                if (s === 0) {
                    return;
                }
                this.moveTime = new Date().getTime();
                var cache = {
                    s: s,
                    t: t
                };
                if (this.cacheThree.length < 2) {
                    this.cacheThree.push(cache);
                } else {
                    this.cacheThree.splice(0, 1);
                    this.cacheThree = this.cacheThree.concat(cache);
                }
            },
            /*计算缓动的初速度*/
            computeEndS(){
                if (this.cacheThree.length < 2) {
                    return 0;
                } else {
                    var s1 = this.cacheThree[1]['s'] - this.cacheThree[0]['s'];
                    var t1 = this.cacheThree[1]['t'] - this.cacheThree[0]['t'];
                    return s1 / t1;
                }
            },
            handleTouchStart(event) {
                event.preventDefault();
                this.diffTime = new Date().getTime();
                this.startMoveFlag = true;
                this.startY = event.targetTouches[0].screenY;
                this.touchTarget = this.getTargetEl(event.target);
                /*每次移动开始时设置初始的oldY的值*/
                this.oldY = this.getTranslateY(this.touchTarget);
            },
            handleTouchMove(event) {
                var tempS = event.targetTouches[0].screenY - this.currentY;
                this.currentY = event.targetTouches[0].screenY;
                this.distance = this.currentY - this.startY;
                let temDis = this.distance / this.factor + this.oldY;
                this.touchTarget.style["-webkit-transform"] = 'translateY(' + temDis + 'em)';
            },
            handleTouchEnd(event) {
                event.preventDefault();
                this.startMoveFlag = false;
                let temDis = Math.round(this.distance / this.factor) + this.oldY;

                /*计算缓动值*/
                var duration = new Date().getTime() - this.diffTime;
                // 300毫秒是判断间隔的最佳时间
                if (duration < 300 && Math.abs(this.distance) > 10) {
                    var distance = this.distance,
                            speed = Math.abs(distance) / duration,
                            destination,
                            deceleration = 0.0006;  // 加速度因子
                    // 初速度为0 距离等于速度的平方除以2倍加速度
                    destination = (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
                    // 初始时间为0，初始速度为0 时间等于速度除以加速度
                    duration = speed / deceleration;
                    temDis += Math.round(destination/this.factor);
                }

                /*设置为2的整数倍*/
                temDis = temDis % 2 === 0 ? temDis : temDis - 1;
                /*设置最小值*/
                if (temDis > this.defaultOldY * 2) {
                    temDis = this.defaultOldY * 2;
                }
                /*设置最大值*/
                var index = this.getCurrentNodeIndex(this.touchTarget);
                var maxValue = this.pickerArray[index].length;
                if (temDis < -maxValue * 2 + 6) { // *2是每个节点是2em,+6是因为最终要留至少三个节点在屏幕上
                    temDis = -maxValue * 2 + 6;
                }
                /*确定最终的滚动位置*/
                setTimeout(()=> {
                    this.touchTarget.style["-webkit-transform"] = 'translateY(' + temDis + 'em)';
                }, 0);
                this.oldY = temDis;
                this.startY = 0;
                this.currentY = 0;
                /*设置当前值*/
                var types = this.type.split('-');
                var value = this.pickerArray[index][0] + (Math.abs(temDis - 6) / 2 - 1),
                        currentMonth; //-1是因为重复算了一次初始值
                switch (types[index]) {
                    case "年": // 日期
                        this.currentValue = new Date(value, this.currentValue.getMonth(), this.currentValue.getDate(), this.currentValue.getHours(), this.currentValue.getMinutes());
                        currentMonth = this.currentValue.getMonth();
                        var days = this.getDaysInMonth(this.currentValue.getFullYear(), currentMonth + 1);
                        this.changeDays(days);
                        var oldY = this.getTranslateY(this.$el.querySelectorAll(".flex-left")[2]);
                        var maxDays = this.pickerArray[2].length;
                        if (oldY < -maxDays * 2 + 6) { // *2是每个节点是2em,+6是因为最终要留至少三个节点在屏幕上
                            this.translateYCount(this.$el.querySelectorAll(".flex-left")[2], -maxDays + 3);
                        }
                        break;
                    case "月":
                        this.currentValue = new Date(this.currentValue.getFullYear(), (value - 1), this.currentValue.getDate(), this.currentValue.getHours(), this.currentValue.getMinutes());
                        currentMonth = value - 1;
                        var days = this.getDaysInMonth(this.currentValue.getFullYear(), currentMonth + 1);
                        this.changeDays(days);
                        var oldY = this.getTranslateY(this.$el.querySelectorAll(".flex-left")[2]);
                        var maxDays = this.pickerArray[2].length;
                        if (oldY < -maxDays * 2 + 6) { // *2是每个节点是2em,+6是因为最终要留至少三个节点在屏幕上
                            this.translateYCount(this.$el.querySelectorAll(".flex-left")[2], -maxDays + 3);
                        }
                        break;
                    case "日":
                        this.currentValue = new Date(this.currentValue.getFullYear(), this.currentValue.getMonth(), Number(value), this.currentValue.getHours(), this.currentValue.getMinutes());
                        break;
                    case "时":
                        this.currentValue = new Date(this.currentValue.getFullYear(), this.currentValue.getMonth(), this.currentValue.getDate(), Number(value), this.currentValue.getMinutes());
                        break;
                    case "分":
                        this.currentValue = new Date(this.currentValue.getFullYear(), this.currentValue.getMonth(), this.currentValue.getDate(), this.currentValue.getHours(), Number(value));
                        break;
                    case "省":
                        break;
                    case "市":
                        break;
                    case "县":
                        break;
                }
            },
            /*取消*/
            cancel() {
                this.$emit('pickerClick', false);
            },
            /*确定*/
            confirm() {
                this.$emit('pickerClick', true, Date.parse(this.currentValue));
            }
        }
    };
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "./style.less";
</style>
