import Vue from "vue";
import Vuex from "vuex";
import createPersistedStore from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userNo: "",
    isLogin: false,
  },
  getters: {},
  mutations: {
    setUser(state, userNo) {
      state.userNo = userNo;
      state.isLogin = true;
    },
    logout(state) {
      state.userNo = null;
      state.isLogin = false;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedStore()],
});
