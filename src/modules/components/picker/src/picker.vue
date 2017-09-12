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
                   :style="{transitionDuration: startMoveFlag?'0ms':'200ms',webkitTransform: 'translateY('+ defaultOldY*2 +'em)'}">
                <div v-for="picker in pickers" class="row">{{picker}}</div>
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
      show: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      pickers: {
        type: Array,
      },
      gaps: {
        type: Array
      },
      type: {
        type: String,
        default: 'date'
      },
      startYear: {
        type: String,
        default: '1900'
      },
      endYear: {
        type: String,
        default: '2025'
      },
      startMonth: {
        type: String,
        default: '1'
      },
      endMonth: {
        type: String,
        default: '12'
      },
      startDay: {
        type: String,
        default: '1'
      },
      endDay: {
        type: String,
        default: '31'
      },
      currentDate: {
        type: Date,
        default: function () {
          return new Date();
        }
      },
      showTitle: {
        type: Boolean,
        default: true
      },
      defaultOldY: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        /*显示或隐藏picker组件*/
        showFlag: this.show,
        /*动画切换标志*/
        animateFlag: true,
        /*年-月-日的后缀标题*/
        dateTitle: [
          "年",
          "月",
          "日",
        ],
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
        currentValue: null,
        /*时间差*/
        diffTime: 0,
        /*移动到最高点的时间*/
        moveTime: 0,
        /*存储三个数据*/
        cacheThree: [],
      };
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
        if (this.type === "date" && this.showTitle) {
          return true;
        }
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
        switch (this.type) {
          case "date": // 日期
            for (let j = 0; j < 3; j++) {
              this.pickerArray.push([]);
              if (j === 0) {
                for (let i = Number(this.startYear), end = Number(this.endYear); i <= end; i++) {
                  this.pickerArray[j].push(i);
                }
              }
              if (j === 1) {
                for (let i = Number(this.startMonth), end = Number(this.endMonth); i <= end; i++) {
                  this.pickerArray[j].push(i);
                }
              }
              if (j === 2) {
                for (let i = Number(this.startDay), end = Number(this.endDay); i <= end; i++) {
                  this.pickerArray[j].push(i);
                }
              }
            }
            this.gagArray = this.dateTitle;
            this.currentValue = this.currentDate;
            break;
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
        switch (this.type) {
          case "date": // 日期
            var data = this.$el.querySelectorAll('.flex-left');
            var countYear = Number(this.currentValue.getFullYear()) - Number(this.startYear);
            this.translateYCount(data[0], -countYear + this.defaultOldY);
            var countMonth = Number(this.currentValue.getMonth() + 1) - Number(this.startMonth);
            this.translateYCount(data[1], -countMonth + this.defaultOldY);
            var countDay = Number(this.currentValue.getDate()) - Number(this.startDay);
            this.translateYCount(data[2], -countDay + this.defaultOldY);
            this.changeDays(this.getDaysInMonth(this.currentValue.getFullYear(), this.currentValue.getMonth() + 1));
            break
        }
      },
      /*移动dom节点多少个count，count可以为正和负，分别代表上下方向*/
      translateYCount(dom, count) {
        dom.style["-webkit-transform"] = 'translateY(' + count * 2 + 'em)';
      },
      /*改变year或者month的时候都需要同步改变天数*/
      changeDays(count) {
        var arr = this.pickerArray;
        this.pickerArray = [];
        arr[2] = [];
        for (var i = 1; i <= count; i++) {
          arr[2].push(i);
        }
        this.pickerArray = arr;
      },
      /*得到当前移动的是什么节点的下标*/
      getCurrentNodeIndex(dom) {
        let els = Array.prototype.slice.call(this.$el.querySelectorAll(".flex-left"));
        var index;
        Array.prototype.slice.apply(els).forEach((node, i) => {
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
        console.log(new Date().getTime());
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
        var tempTime = (new Date().getTime() - this.diffTime) / 1000; // 秒
        var tempS = event.targetTouches[0].screenY - this.currentY;
        this.currentY = event.targetTouches[0].screenY;
        this.distance = this.currentY - this.startY;
        let temDis = this.distance / this.factor + this.oldY;
        this.touchTarget.style["-webkit-transform"] = 'translateY(' + temDis + 'em)';
        this.addCacheThree(tempS, tempTime);
      },
      handleTouchEnd(event) {
        event.preventDefault();
        this.startMoveFlag = false;
        let temDis = Math.round(this.distance / this.factor) + this.oldY;
        /*根据缓存的路程和时间来计算加速度，设置缓动效果*/
//        var v = this.computeEndS();
//        var diffTime = (new Date().getTime() - this.moveTime) / 1000; // 秒
//        var s = Math.abs(v) * diffTime;
//        temDis = temDis > 0 ? temDis + Math.round(s / this.factor) : temDis - Math.round(s / this.factor);

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
        setTimeout(() => {
          this.touchTarget.style["-webkit-transform"] = 'translateY(' + temDis + 'em)';
        }, 0);
        this.oldY = temDis;
        this.startY = 0;
        this.currentY = 0;
        /*设置当前值*/
        switch (this.type) {
          case "date": // 日期
            var value = this.pickerArray[index][0] + (Math.abs(temDis - 6) / 2 - 1),
              currentMonth; //-1是因为重复算了一次初始值
            if (index !== 2) {
              if (index === 0) {
                this.currentValue = new Date(value, this.currentValue.getMonth(), this.currentValue.getDate());
                currentMonth = this.currentValue.getMonth();
              } else {
                this.currentValue = new Date(this.currentValue.getFullYear(), (value - 1), this.currentValue.getDate());
                currentMonth = value - 1;
              }
              var days = this.getDaysInMonth(this.currentValue.getFullYear(), currentMonth + 1);
              this.changeDays(days);
              var oldY = this.getTranslateY(this.$el.querySelectorAll(".flex-left")[2]);
              var maxDays = this.pickerArray[2].length;
              if (oldY < -maxDays * 2 + 6) { // *2是每个节点是2em,+6是因为最终要留至少三个节点在屏幕上
                this.translateYCount(this.$el.querySelectorAll(".flex-left")[2], -maxDays + 3);
              }
            }
            break;
        }
      },
      /*取消*/
      cancel() {
        this.$emit('pickerClick', false)
      },
      /*确定*/
      confirm() {
        this.$emit('pickerClick', true, this.currentValue);
      }
    },
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>
