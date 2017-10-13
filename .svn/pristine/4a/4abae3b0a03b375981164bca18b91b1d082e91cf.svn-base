<template>
    <div class="loadmore">
        <div class="content" :class="{ 'is-dropped': topDropped || bottomDropped}"
             :style="{ 'transform': 'translateY(' + (canRef ? translate : '0') + 'px)' ,
             'transition-duration': animateTime + 's'}">
            <slot name="top">
                <div class="top" v-if="topMethod">
                    <spinner v-if="topStatus != ''" type="snake"  width="20" height="20" color="#aeaeae"></spinner>
                    <p style="display: inline;text-align: center">{{ topText }}</p>
                </div>
            </slot>
            <slot></slot>
            <slot name="bottom" v-if="bottomType === 'drop' && canInif">
                <div class="bottom" v-if="bottomMethod">
                    <spinner width="20" type="snake" color="#aeaeae"></spinner>
                    <span class="text">{{ bottomText }}</span>
                </div>
            </slot>
            <slot name="bottom" v-if="canInif && bottomType != 'drop'">
                <div v-if="bottomMethod" class="inifScroll" :style="{'transition-duration':btAnimateTime + 's'}">
                    <spinner width="20" type="snake" color="#aeaeae"></spinner>
                    <span class="text">{{ bottomText }}</span>
                </div>
            </slot>
        </div>
    </div>
</template>

<style scoped lang="less" rel="stylesheet/less">
    @import "style.less";
</style>

<script type="text/babel">
    import spinner from '../../spinner/';
    export default {
        name: 'mt-loadmore',
        components: {
            'spinner': spinner
        },

        props: {
            maxDistance: {
                type: Number,
                default: 0
            },
            autoFill: {
                type: Boolean,
                default: true
            },
            distanceIndex: {
                type: Number,
                default: 2
            },
            topPullText: {
                type: String,
                default: '下拉刷新'
            },
            topDropText: {
                type: String,
                default: '释放更新'
            },
            topLoadingText: {
                type: String,
                default: '加载中...'
            },
            topDistance: {
                type: Number,
                default: 70
            },
            topMethod: {
                type: Function
            },
            topParam: {
                type: [String, Object, Boolean, Number, null],
                default: null
            },
            bottomPullText: {
                type: String,
                default: '上拉刷新'
            },
            bottomDropText: {
                type: String,
                default: '释放更新'
            },
            bottomLoadingText: {
                type: String,
                default: '加载中...'
            },
            bottomDistance: {
                type: Number,
                default: 70
            },
            bottomMethod: {
                type: Function
            },
            bottomParam: {
              type: [String, Object, Boolean, Number, null],
              default: null
            },
            bottomType: {
                type: String,
                default: 'infinite'
            },
            bottomAllLoaded: {
                type: Boolean,
                default: false
            },
            bottomText: {
              type: String,
              default: '努力加载中...'
            },
            canInif: {
              type: Boolean,
              default: false
            },
            canRef: {
              type: Boolean,
              default: true
            }
        },
        computed:{
        },
        data() {
            return {
                translate: 0,
                scrollEventTarget: null,
                containerFilled: false,
                topText: '',
                topDropped: false,
                bottomDropped: false,
                bottomReached: false,
                direction: '',
                startY: 0,
                startScrollTop: 0,
                currentY: 0,
                topStatus: '',
                bottomStatus: '',
                touchLocked: false, // touch事件的阻塞，当出发了move事件之后，就不在牵引事件
                viewportScrollTop: 0, // 用于判断滚动方向
                bottomTm: null,  // 用于节流
                animateTime: 0,  //动画时长
                btAnimateTime: 0,  //动画时长
            };
        },

        watch: {
            topStatus(val) {
                this.$emit('top-status-change', val);
                switch (val) {
                    case 'pull':
                        this.topText = this.topPullText;
                        break;
                    case 'drop':
                        this.topText = this.topDropText;
                        break;
                    case 'loading':
                        this.topText = this.topLoadingText;
                        break;
                }
            },

            canInif() {
              this.init();
            },

            bottomStatus(val) {
                this.$emit('bottom-status-change', val);
                switch (val) {
                    case 'pull':
                        this.bottomText = this.bottomType === 'drop' ? this.bottomPullText : this.bottomText;
                        break;
                    case 'drop':
                        this.bottomText = this.bottomDropText;
                        break;
                    case 'loading':
                        this.bottomText = this.bottomType === 'drop' ? this.bottomLoadingText : this.bottomText;
                        break;
                }
            }
        },

        methods: {
            onTopLoaded() {
                this.translate = 0;
                setTimeout(() => {
                    this.topStatus = 'pull';
                }, 200);
            },

            onBottomLoaded() {
                if (this.bottomType === 'drop') {
                    this.bottomStatus = 'pull';
                    this.bottomDropped = false;
                    this.$nextTick(() => {
                        if (this.scrollEventTarget === window) {
                            document.body.scrollTop += 40;
                        } else {
                            this.scrollEventTarget.scrollTop += 40;
                        }
                        this.translate = 0;
                    });
                    if (!this.bottomAllLoaded && !this.containerFilled) {
                        this.fillContainer();
                    }
                } else {
                    this.$nextTick(() => {
                        this.bottomDropped = false;
                        this.bottomStatus = 'pull';
                        this.btAnimateTime = 0.5;
                    });
                }
            },

            getScrollEventTarget(element) {
                let currentNode = element;
                while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                    if (overflowY === 'scroll' || overflowY === 'auto') {
                        return currentNode;
                    }
                    currentNode = currentNode.parentNode;
                }
                return window;
            },

            getScrollTop(element) {
                if (element === window) {
                    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
                } else {
                    return element.scrollTop;
                }
            },
            getVisibleHeight: function (element) {
                if (element === window) {
                    return document.documentElement.clientHeight;
                }

                return element.clientHeight;
            },
            // 文档的总高度
            getScrollHeight () {
                var bodyScrollHeight = 0;
                var documentScrollHeight = 0;
                if (document.body) {
                    bodyScrollHeight = document.body.scrollHeight;
                }
                if (document.documentElement) {
                    documentScrollHeight = document.documentElement.scrollHeight;
                }
                return bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
            },
            // 获取元素距离窗口上的高度
            getElementTop: function (element) {
                if (element === window) {
                    return this.getScrollTop(window);
                }
                return element.getBoundingClientRect().top + this.getScrollTop(window);
            },
            bindTouchEvents() {
                /*touch监听*/
                this.$el.addEventListener('touchstart', this.handleTouchStart);
                this.$el.addEventListener('touchmove', this.handleTouchMove);
                this.$el.addEventListener('touchend', this.handleTouchEnd);
            },

            init() {
                this.topStatus = 'pull';
                this.bottomStatus = 'pull';
                this.topText = this.topPullText;
                this.scrollEventTarget = this.getScrollEventTarget(this.$el);
                if(this.canInif) {
                  if (typeof this.bottomMethod === 'function' && this.bottomType === 'drop') {
                    this.fillContainer();
                    this.bindTouchEvents();
                  } else {
                    /*滚动监听*/
                    this.scrollEventTarget.addEventListener('scroll', this.scrollListener);
                  }
                }

                if (typeof this.topMethod === 'function') {
                    this.bindTouchEvents();
                }
            },

            fillContainer() {
                if (this.autoFill) {
                    this.$nextTick(() => {
                        if (this.scrollEventTarget === window) {
                            this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                                document.documentElement.getBoundingClientRect().bottom;
                        } else {
                            this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                                this.scrollEventTarget.getBoundingClientRect().bottom;
                        }
                        if (!this.containerFilled) {
                            this.bottomStatus = 'loading';
                            this.bottomMethod();
                        }
                    });
                }
            },

            checkBottomReached() {
                if (this.scrollEventTarget === window) {
                    return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
                } else {
                    return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
                }
            },

            handleTouchStart(event) {
                this.startY = event.touches[0].clientY;
                this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
                this.bottomReached = false;
                if (this.topStatus !== 'loading') {
                    this.animateTime = 0;
                    this.topStatus = 'pull';
                    this.topDropped = false;
                }
                if (this.bottomStatus !== 'loading') {
                    this.bottomStatus = 'pull';
                    this.bottomDropped = false;
                }
            },

            handleTouchMove(event) {
                this.touchLocked = true;    //touch事件锁
                if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                    return;
                }
                this.currentY = event.touches[0].clientY;
                let distance = (this.currentY - this.startY) / this.distanceIndex;
                this.direction = distance > 0 ? 'down' : 'up';
                if (typeof this.topMethod === 'function' && this.direction === 'down' &&
                    this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading') {
                    event.preventDefault();
                    event.stopPropagation();
                    if (this.maxDistance > 0) {
                        this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
                    } else {
                        this.translate = distance - this.startScrollTop;
                    }
                    if (this.translate < 0) {
                        this.translate = 0;
                    }
                    this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
                }

                if (this.direction === 'up') {
                    this.bottomReached = this.bottomReached || this.checkBottomReached();
                }
                if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&  this.bottomType === 'drop' &&
                    this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (this.maxDistance > 0) {
                        this.translate = Math.abs(distance) <= this.maxDistance
                            ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
                    } else {
                        this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
                    }
                    if (this.translate > 0) {
                        this.translate = 0;
                    }
                    this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
                }
            },

            handleTouchEnd(event) {
                if (this.touchLocked) {
                    this.touchLocked = false;
                    event.stopPropagation();
                }
                if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
                    this.topDropped = true;
                    if (this.topStatus === 'drop') {
                        this.animateTime = 0.5;
                        this.translate = '40';
                        this.topStatus = 'loading';
                        this.topMethod(this.topParam);
                    } else {
                        this.translate = '0';
                        this.topStatus = 'pull';
                    }
                }
                if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
                    this.bottomDropped = true;
                    this.bottomReached = false;
                    if (this.bottomStatus === 'drop') {
                        this.translate = '-40';
                        this.bottomStatus = 'loading';
                        this.bottomMethod(this.bottomParam);
                    } else {
                        this.translate = '0';
                        this.bottomStatus = 'pull';
                    }
                }
                this.direction = '';
            },

            scrollListener: function (event) {
                var scrollEventTarget = this.scrollEventTarget;
                var element = this.$el;
                var distance = 30;
                var viewportScrollTop = this.getScrollTop(scrollEventTarget);
                /*判断滚动方向，如果向上滚动不加载*/
                if (this.viewportScrollTop >= viewportScrollTop) {
                    this.viewportScrollTop = viewportScrollTop;
                    return;
                }
                this.viewportScrollTop = viewportScrollTop;
                var viewportBottom = viewportScrollTop + this.getVisibleHeight(scrollEventTarget);
                var shouldTrigger = false;
                if (scrollEventTarget === element) {
                    shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
                } else {
                    var elementBottom = this.getElementTop(element) - this.getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;
                    shouldTrigger = viewportBottom + distance >= elementBottom;
                }
                if (shouldTrigger && this.canInif) {
                    this.bottomDropped = true;
                    if(this.bottomStatus != 'loading') {
                      this.bottomMethod(this.bottomParam);
                      this.bottomStatus = 'loading';
                    }
                    setTimeout(() => {
                      this.bottomStatus = "";
                      this.viewportScrollTop = this.getScrollTop(scrollEventTarget);
                    }, 1000);


                    // window.clearTimeout(this.bottomTm);
                    // this.bottomTm = setTimeout(()=> {
                    //     this.bottomStatus = 'loading';
                    //     this.bottomMethod(this.bottomParam);
                    // }, 200);
                }
            }
        },

        mounted() {
            this.init();
        }
    };
</script>
