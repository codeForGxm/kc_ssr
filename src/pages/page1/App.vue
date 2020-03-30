<template>
  <div id="app">
    <div class="wrap">
      <p >page1</p>
      <h2>111异步Ajax数据111111：</h2>
      <span>{{ msg.data[1].name}}</span>
      <img src="./imgs/img_bg.png" alt="">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getBaseData } from '@api/page1/index'
export default {
  asyncData: [
    (store) => {
      return store.dispatch('getInitData', {initData: getBaseData, params: {test: 1}, 'key': 'data1'})
    },
    (store) => {
      return store.dispatch('getInitData', {initData: getBaseData, params: {test: 2}, 'key': 'data2'})
    },
    (store) => {
      return store.dispatch('getInitData', {initData: getBaseData, params: {test: 3}, 'key': 'data3'})
    }
  ],
  data() {
    return {
      msg: this.$store.state.initPageData.data1
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
    getBaseData()
  }
}
</script>
<style lang="less" scoped>
.wrap{
    background: red;
    font-size: 0.12rem;
    .name{
      display: flex;
    }
  }
</style>