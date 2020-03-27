import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



function createStore() {
  const store = new Vuex.Store({
    state: {
      initPageData: {}
    },

    mutations: {
      'INIT_DATA'(state, {key, data}) {
        Vue.set(state.initPageData, key, data)
      }
    },

    actions: {
      getInitData ({commit}, receive) {
        // `store.dispatch()` 会返回 Promise，{getDataFun, key}
        // 以便我们能够知道数据在何时更新
        return receive.initData().then( data => {
          commit('INIT_DATA', {'key': receive.key,  data})
        })
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  } else {
    console.log('no browser');
  }
  
  return store;
}

export default createStore;