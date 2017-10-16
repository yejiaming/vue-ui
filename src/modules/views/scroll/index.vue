<template>
    <div v-scroll>
        <div style="width: 100%;height: 100px;font-size: 25px;font-weight: 700;text-align: center;line-height: 100px" >
            <router-link to="selfScroll">
                <h2>self-scroll指令</h2>
            </router-link>
        </div>
        <sticky class="sticky">
            <input type="text" style="width: 80%;height: 40px;" placeholder="hello world">
        </sticky>
        <div style="border: 1px solid #000000;;height: 400px;overflow-y: hidden;position: relative;z-index: -100;">
            <div v-scroll>
                <div style="width: 100%;height: 100px;font-size: 25px;font-weight: 700;text-align: center;line-height: 100px" v-for="item in 100">{{item}}</div>
            </div>
        </div>
        <div style="width: 100%;height: 100px;font-size: 25px;font-weight: 700;text-align: center;line-height: 100px" v-for="item in 100">{{item}}</div>
    </div>
</template>

<script>
    import {stickyTouch} from '../../components/index';
    export default {
        components: {
            sticky: stickyTouch
        },
        data() {
            return {};
        },
        mounted(){
        },
        methods: {}
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
    .sticky {
        background: #96a6d7;
        height: 100px;
        top: 0;
        line-height: 100px;
        text-align: center;
    }
</style>
