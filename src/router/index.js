import Vue from "vue";
import VueRouter from "vue-router";
import IndexView from "../components/index/IndexView.vue";
import CompanyUserRegister from "@/pages/user/company/CompanyUserRegister.vue";
import CheckTerms from "@/pages/user/signup/terms/CheckTerms.vue";
import BandMain from "@/pages/band/BandMain.vue";

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
  {
    path: "/join",
    name: "join",
    component: CheckTerms,
    meta: {
      title: "Aling - 회원가입",
    },
    child: {
      components: CompanyUserRegister,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//라우팅 시 Title 변경.
router.afterEach((to) => {
  const title = to.meta.title === undefined ? "Aling" : to.meta.title;
  Vue.nextTick(() => {
    document.title = title;
  });
});

export default router;
