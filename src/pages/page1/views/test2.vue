<template>
  <div class="bar">
    <!-- <h1 @click="onHandleClick">Bar</h1>
    <p>Component</p>
    <h2>异步Ajax数据：</h2>
    <span>{{ msg }}</span> -->
    test2
  </div>
</template>

<script>
  // const fetchBar = function() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve('bar 组件返回 ajax 数据1111');
  //     }, 1000);
  //   });
  // };
  // const fetchBar2 = function() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve('bar 组件返回 ajax 22');
  //     }, 1000);
  //   });
  // };
  // const fetchBar3 = function() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve('bar 组件返回 ajax 333');
  //     }, 1000);
  //   });
  // };
  // const fetchInitialData1 = ({ store }) => {
  //   return store.dispatch('getInitData', {initData: fetchBar, 'key': 'bar'})
  // };
  // const fetchInitialData2 = ({ store }) => {
  //   return store.dispatch('getInitData', {initData: fetchBar2, 'key': 'bar2'})
  // };
  // const fetchInitialData3 = ({ store }) => {
  //   return store.dispatch('getInitData', {initData: fetchBar3, 'key': 'bar3'})
  // };
  export default {
    // asyncData: [fetchInitialData1, fetchInitialData2, fetchInitialData3],
    // data() {
    //   return {
    //     msg: this.$store.state.initPageData.bar
    //   }
    // },
    // methods: {
    //   onHandleClick() {
    //     alert('bar');
    //   },
    //   test ({t, y}) {
    //     console.log(t, y)
    //   }
    // },

    // mounted() {
    // },
  }
</script>

<style>
.bar {
  background: bisque;
}
</style>
