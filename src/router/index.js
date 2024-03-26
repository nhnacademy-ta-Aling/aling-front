import Vue from "vue";
import VueRouter from "vue-router";
import CustomContents from "@/components/index/CustomContents.vue";
import IndexView from "@/pages/index/IndexView.vue";
import AdminView from "@/pages/index/AdminView.vue";
import BandMainView from "@/pages/band/BandMainView.vue";
import BandList from "@/pages/band/BandList.vue";
import BandDetail from "@/pages/band/BandDetail.vue";
import MyPageIndexView from "@/pages/mypage/MyPageIndexView.vue";
import MyPageBandView from "@/pages/mypage/band/MyPageBandView.vue";
import MyPageBandCreation from "@/pages/mypage/band/MyPageBandCreation.vue";
import MyPageBandList from "@/pages/mypage/band/MyPageBandList.vue";
import IndexMainView from "@/pages/index/IndexMainView.vue";
import MyPageBandInfoModify from "@/pages/mypage/band/MyPageBandInfoModify.vue";
import MyPageBandCategory from "@/pages/mypage/band/MyPageBandCategory.vue";
import MyPageBandClosing from "@/pages/mypage/band/MyPageBandClosing.vue";
import MyPageBandLeave from "@/pages/mypage/band/MyPageBandLeave.vue";
import MyPageBandUser from "@/pages/mypage/band/MyPageBandUser.vue";
import UserRegisterSelectView from "@/pages/user/register/UserRegisterSelectView.vue";
import NormalUserRegisterView from "@/pages/user/register/normal/NormalUserRegisterView.vue";
import CompanyUserRegisterView from "@/pages/user/register/company/CompanyUserRegisterView.vue";
import UserRegisterMainView from "@/pages/user/register/UserRegisterMainView.vue";
import LoginView from "@/pages/user/login/LoginView.vue";
import PostMainView from "@/pages/post/PostMainView.vue";
import SinglePost from "@/pages/post/SinglePost.vue";
import MyPageIndexMainView from "@/pages/mypage/MyPageIndexMainView.vue";
import MyPageUser from "@/pages/mypage/user/MyPageUser.vue";
import MyPageNormalPost from "@/pages/mypage/post/MyPageNormalPost.vue";
import MyPageBandPost from "@/pages/mypage/post/MyPageBandPost.vue";
import IntegrationPostView from "@/pages/post/IntegrationPostView.vue";
import VueCookies from "vue-cookies";
import GithubCallbackView from "@/pages/user/login/GithubCallbackView.vue";
import ScrapView from "@/pages/mypage/scrap/ScrapView.vue";

Vue.use(VueRouter);
Vue.use(VueCookies);

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
        path: "/articles/integration",
        component: PostMainView,
        meta: {
          title: "Aling - Integration Post",
        },
        children: [
          {
            path: ":postNo",
            component: IntegrationPostView,
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
          {
            path: ":bandName",
            component: MyPageBandInfoModify,
          },
          {
            path: ":bandName/band-users",
            component: MyPageBandUser,
          },
          {
            path: ":bandName/categories",
            component: MyPageBandCategory,
          },
          {
            path: ":bandName/leave",
            component: MyPageBandLeave,
          },
          {
            path: ":bandName/closing",
            component: MyPageBandClosing,
          },
        ],
      },
      {
        path: "scraps",
        name: "mypage-scraps-view",
        component: ScrapView,
      },
      {
        path: "",
        component: MyPageIndexMainView,
        children: [
          {
            path: "",
            component: MyPageUser,
          },
          {
            path: "normal-posts",
            component: MyPageNormalPost,
          },
          {
            path: "band-posts",
            component: MyPageBandPost,
          },
        ],
      },
    ],
  },
  {
    path: "/signup",
    name: "signup-view",
    component: UserRegisterMainView,
    children: [
      {
        path: "",
        component: UserRegisterSelectView,
      },
      {
        path: "/signup/normal",
        name: "normal-signup-view",
        component: NormalUserRegisterView,
      },
      {
        path: "/signup/company",
        name: "company-signup-view",
        component: CompanyUserRegisterView,
      },
    ],
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/oauth/github",
    name: "oauth-github-login-view",
    component: GithubCallbackView,
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
