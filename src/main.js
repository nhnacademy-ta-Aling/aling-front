import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VueCookies from "vue-cookies";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueCookies);

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

export const Header = Object.freeze({
  X_BAND_NO: "X-BAND-NO",
  X_FILE_CATEGORY: "X-File-Category",
});
