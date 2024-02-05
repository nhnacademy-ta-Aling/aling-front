import Vue from "vue";
import VueRouter from "vue-router";
import IndexView from "../views/IndexView.vue";
import BandMain from "@/components/band/BandMain.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index-view",
    component: IndexView,
  },
  {
    path: "/group",
    name: "group-view",
    component: BandMain,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
