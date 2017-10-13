<template>
  <div class="scroll-y">
    <div style="width: 100%;background: #8e908c;height: 100px">
      1
    </div>

    <div style="width: 100%;background:#96a6d7;height: 100px;position: relative;top: 0;right: 0;z-index: 99" id="div2">
      <div style="width: 100%;background:#96a6d7;will-change:change;height: 100px;top: 0;right: 0;position:absolute;z-index: 99" id="div3">
        3
      </div>
    </div>
    <div style="width: 100%;background: #fff;height: 1000px;background: linear-gradient(to bottom, #43a9f1,blue);"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    mounted(){
      var dom = this.$el;
      var dom1 = this.$el.querySelector('#div2');
      var dom2 = this.$el.querySelector('#div3');
      dom.addEventListener('scroll',()=>{
        if(dom2.getBoundingClientRect().top <= 0) {
          dom2.style.position = 'fixed';
        }
        if(dom.scrollTop <= 100 && dom2.style.position !='absolute') {
          dom2.style.position = 'absolute';
        }
      })
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
