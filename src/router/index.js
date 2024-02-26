import Vue from "vue";
import VueRouter from "vue-router";
import CompanyUserRegister from "@/pages/user/company/CompanyUserRegisterView.vue";
import NormalUserRegister from "@/pages/user/normal/NormalUserRegisterView.vue";
import CustomContents from "@/components/index/CustomContents.vue";
import IndexView from "@/pages/index/IndexView.vue";
import UserRegister from "@/components/user/UserRegister.vue";
import AdminView from "@/pages/index/AdminView.vue";
import BandMainView from "@/pages/band/BandMainView.vue";
import BandList from "@/pages/band/BandList.vue";
import BandDetail from "@/pages/band/BandDetail.vue";
import MyPageIndexView from "@/pages/mypage/MyPageIndexView.vue";
import MyPageBandView from "@/pages/mypage/MyPageBandView.vue";
import MyPageBandCreation from "@/pages/mypage/MyPageBandCreation.vue";
import MyPageBandList from "@/pages/mypage/MyPageBandList.vue";
import IndexMainView from "@/pages/index/IndexMainView.vue";
import PostMainView from "@/pages/post/PostMainView.vue";
import SinglePost from "@/pages/post/SinglePost.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index-view",
    component: IndexView,
    children: [
      {
        path: "",
        component: IndexMainView,
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
        path: "/articles",
        name: "post-view",
        component: PostMainView,
        meta: {
          title: "Aling",
        },
        children: [
          {
            path: ":postNo",
            component: SinglePost,
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
    path: "/my-page",
    name: "my-page-index-view",
    component: MyPageIndexView,
    meta: {
      title: "Aling - 마이페이지",
    },
    children: [
      {
        path: "bands",
        component: MyPageBandView,
        children: [
          {
            path: "",
            component: MyPageBandList,
          },
          {
            path: "new",
            component: MyPageBandCreation,
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
