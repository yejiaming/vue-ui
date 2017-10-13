<template>
  <div class="scroll-y">
    <div style="width: 100%;background: #8e908c;height: 100px">
    </div>

    <div v-sticky style="width: 100%;background: #1abc9c;height: 100px;position: sticky;top: 0;right: 0;z-index: 99" id="div2">
    </div>
    <div style="width: 100%;background: #fff;height: 1000px;background: linear-gradient(to bottom, #43a9f1,#96a6d7);"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    mounted(){
    },
    methods: {

    }
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
  }
</style>
