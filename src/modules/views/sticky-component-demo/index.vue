<template>
    <div class="scroll-y">
        <div style="width: 100%;background: #8e908c;height: 100px">
            1
        </div>
        <sticky class="sticky">
            <input type="text" style="width: 80%;height: 40px;" placeholder="hello world">
        </sticky>
        <div style="width: 100%;background: #fff;height: 1000px;background: linear-gradient(to bottom, #43a9f1,#96a6d7);">333
            <router-link to="loadMore">
                <h2>loadMore组件</h2>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {sticky} from '../../components/index';
    export default {
        components: {
            sticky
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
    .scroll-y {
        position: absolute;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 100%;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none;
        }
        .sticky {
            background: #96a6d7;
            height: 100px;
            top: 0;
            line-height: 100px;
            text-align: center;
        }
    }
</style>
