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

export const BandUserRole = Object.freeze({
  BAND_ROLE_CREATOR: 1,
  BAND_ROLE_ADMIN: 2,
  BAND_ROLE_USER: 3,
});

export const Career = Object.freeze({
  NEW: "신입",
  LESS_ONE_YEAR: "1년 미만",
  MORE_ONE_YEAR: "1년 이상",
  MORE_TWO_YEAR: "2년 이상",
  MORE_THREE_YEAR: "3년 이상",
  MORE_FIVE_YEAR: "5년 이상",
  MORE_TEN_YEAR: "10년 이상",
});

export const Header = Object.freeze({
  X_BAND_NO: "X-BAND-NO",
  X_FILE_CATEGORY: "X-File-Category",
});
