import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  icons: {
    iconfont: "md",
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

export const FileCategory = {
  USER_PROFILE: 1,
  GROUP_PROFILE: 2,
  RESUME: 3,
  POST_ATTACH: 4,
  REPLY_ATTACH: 5,
  TECH_SKILL: 6,
  HOOKS: 7,
};
