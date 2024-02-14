import Vue from "vue";
import VueRouter from "vue-router";
import IndexView from "../components/index/IndexView.vue";
import CompanyUserRegister from "@/pages/user/company/CompanyUserRegister.vue";
import CheckTerms from "@/pages/user/signup/terms/CheckTerms.vue";
import BandMain from "@/pages/band/BandMain.vue";
import AdminView from "@/components/index/AdminView.vue";
import IndexCustomView from "@/components/index/IndexCustomView.vue";
import CustomContents from "@/components/index/CustomContents.vue";
import NormalUserRegister from "@/pages/user/normal/NormalUserRegisterView.vue";
import IndexView from "@/pages/index/IndexView.vue";
import IndexMainView from "@/pages/index/IndexMainView.vue";
import UserRegister from "@/components/user/UserRegister.vue";
import AdminView from "@/pages/index/AdminView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index-view",
    component: IndexView,
    children: [
      {
        path: "",
        component: IndexCustomView,
        children: [
          {
            path: "",
            component: CustomContents,
          },
        ],
      },
      {
        path: "/bands",
        component: BandMainView,
        meta: {
          title: "Aling - 그룹",
        },
        children: [
          {
            path: "",
            component: BandList,
          },
          {
            path: ":bandName",
            component: BandDetail,
          },
        ],
      },
      {
        path: "/signup",
        name: "signup-view",
        component: UserRegister,
        children: [
          {
            path: "/signup/normal",
            name: "normal-signup-view",
            component: NormalUserRegister,
          },
          {
            path: "/signup/company",
            name: "company-signup-view",
            component: CompanyUserRegister,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    component: AdminView,
    meta: {
      title: "Aling - Admin",
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
