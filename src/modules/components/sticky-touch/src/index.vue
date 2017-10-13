<template>
    <div class="sticky" :style="getPosition">
        <div class="sticky-warp">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/babel">
    export default {
        data () {
            return {}
        },
        computed: {
            getPosition(){
                var position = 'relative';
                return 'position:' + position;
            }
        },
        props: {},
        beforeMount () {
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                var el = this.$el, target = this.$el.parentNode,
                        elWarp = this.$el.querySelector('.sticky-warp'),
                        top = this.getNumberValue(document.defaultView.getComputedStyle(el).top),
                        height = this.getNumberValue(document.defaultView.getComputedStyle(el).height);
                this.addScrollListen(target, ()=> {
                    if (el.getBoundingClientRect().top <= top) {
                        elWarp.style.position = 'fixed';
                    }
                    if (el.getBoundingClientRect().top>= 0 && elWarp.style.position != 'absolute') {
                        elWarp.style.position = 'absolute';
                    }
                })
            },
            cssSupport: function (attr, value) {
                var element = document.createElement('div');
                if (attr in element.style) {
                    element.style[attr] = value;
                    return element.style[attr] === value;
                } else {
                    return false;
                }
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
            getNumberValue(pxValue){
                var value =  String(pxValue).match(/^\-?\+?[0-9]+/g);
                return value ? Number(value) : undefined;
            },
            addScrollListen(target, cb){
                target.addEventListener('y-scroll', (event)=> {
                    cb && cb();
                });
            },
            getScrollEventTarget: function (element) {
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
        },
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
    .sticky {
        width: 100%;
        .sticky-warp {
            width: 100%;
            background: inherit;
            will-change: change;
            height: inherit;
            top: inherit;
        }
    }
</style>