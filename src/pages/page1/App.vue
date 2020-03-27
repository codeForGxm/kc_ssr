<template>
  <div id="app">
    <div class="wrap">
      <p >page1</p>
      <h2>111异步Ajax数据111111：</h2>
      <span>{{ msg }}</span>
      <img src="./imgs/img_bg.png" alt="">
    </div>
  </div>
</template>

<script>
const fetchBar = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('bar 组件返回 ajax 数据1111');
      }, 1000);
    });
  };
  const fetchBar2 = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('bar 组件返回 ajax 22');
      }, 1000);
    });
  };
  const fetchBar3 = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('bar 组件返回 ajax 333');
      }, 1000);
    });
  };
  const fetchInitialData1 = ({ store }) => {
    return store.dispatch('getInitData', {initData: fetchBar, 'key': 'bar'})
  };
  const fetchInitialData2 = ({ store }) => {
    return store.dispatch('getInitData', {initData: fetchBar2, 'key': 'bar2'})
  };
  const fetchInitialData3 = ({ store }) => {
    return store.dispatch('getInitData', {initData: fetchBar3, 'key': 'bar3'})
  };
export default {
  asyncData: [fetchInitialData1, fetchInitialData2, fetchInitialData3],
  data() {
    return {
      msg: this.$store.state.initPageData.bar
    }
  },
  beforeCreate() {
    // console.log('App.vue beforeCreate');
  },

  created() {
    // console.log('App.vue created');
  },

  beforeMount() {
    // console.log('App.vue beforeMount');
  },

  mounted() {
    // console.log('App.vue mounted');
  }
}
</script>
<style lang="less" scoped>
.wrap{
    background: red;
    .name{
      font-size: 14px;
      display: flex;
    }
  }
</style>