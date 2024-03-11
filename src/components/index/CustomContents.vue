<script>
import { Viewer } from "@toast-ui/vue-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.js";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";

import InfiniteLoading from "vue-infinite-loading";
import PostBottomComponent from "@/pages/post/component/PostBottomComponent.vue";

export default {
  components: {
    PostBottomComponent,
    Viewer,
    InfiniteLoading,
  },

  data() {
    return {
      loading: false,
      bandDetail: null,
      bandUserInfo: null,
      error: null,
      infoMore: false,
      infoIsLong: false,
      memberModal: false,
      page: 0,
      size: 5,
      postList: [],
      isReplyViewed: [],
      contentMoreMap: {},
      tuiOptions: {
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
      },
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.bandDetail = null;
      this.loading = true;
      this.page = 0;
      this.postList = [];
      this.$axios
        .get("/post/api/v1/posts?page=" + this.page + "&size=" + this.size, {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("access_token"),
            // FIXME 유저 식별 정보 넘어갈 수 있도록 수정
            "X-TEMP-USER-NO": 2,
            "X-BAND-NO": 15,
          },
        })
        .then((response) => {
          if (response.data.content.length) {
            this.postList = this.postList.concat(response.data.content);
            this.page++;
            response.data.content.forEach((post) => {
              this.$set(this.contentMoreMap, post.post.postNo, false);
            });
          }
        })
        .catch((error) => {
          this.error = error.toString();
        });
    },
    openBandMemberModal() {
      this.memberModal = true;
    },
    clickInfoMore() {
      this.infoMore = true;
    },
    clickInfoLess() {
      this.infoMore = false;
    },
    toggleContentMore(post) {
      this.$set(
        this.contentMoreMap,
        post.postNo,
        !this.contentMoreMap[post.postNo]
      );
    },
    getContentToShow(post) {
      return this.contentMoreMap[post.postNo]
        ? post.content
        : post.content.substring(0, 100);
    },
    shouldShowMoreLessButton(post) {
      return post.content.length > 100;
    },
    copyLink(post) {
      console.log("링크가 복사되었습니다. PostNo:", post.postNo);
    },
    alertReport(post) {
      console.log("신고되었습니다. PostNo:", post.postNo);
    },
    infiniteHandler($state) {
      console.log("infinite call()");
      this.$axios
        .get("/post/api/v1/posts?page=" + this.page + "&size=" + this.size, {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("access_token"),
            // FIXME 유저 식별 정보 넘어갈 수 있도록 수정
            "X-TEMP-USER-NO": 2,
            "X-BAND-NO": 15,
          },
        })
        .then((response) => {
          if (response.data.content.length) {
            this.postList = this.postList.concat(response.data.content);
            $state.loaded();
            this.page += 1;

            response.data.content.forEach((post) => {
              this.$set(this.contentMoreMap, post.post.postNo, false);
            });

            if (response.data.content.length < this.size) {
              $state.complete();
            }
          } else {
            $state.complete();
          }
        })
        .catch(() => {
          alert("server error");
          $state.complete();
        });
    },
  },
};
</script>

<template>
  <v-sheet min-height="70vh" rounded="lg">
    <v-card class="mx-6 mb-12" v-for="obj in postList" :key="obj.postNo">
      <v-row class="d-flex flex-row px-5 py-5">
        <v-avatar size="35">
          <v-img
            v-if="obj.writer.filePath"
            :src="obj.writer.filePath"
            :alt="obj.writer.username"
          ></v-img>
          <v-img
            v-else
            src="../../assets/user-no-image.png"
            alt="No Image"
          ></v-img>
        </v-avatar>
        <div class="flex-grow-1 align-self-start writer-name">
          <h5>{{ obj.writer.username }}</h5>
          <p class="text-caption">
            {{
              obj.post.modifyAt
                ? obj.post.modifyAt + " (수정됨)"
                : obj.post.createAt
            }}
          </p>
        </div>
        <v-menu offset-y rounded left transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list dense rounded>
              <v-list-item @click="copyLink(obj.post)">
                <v-list-item-icon>
                  <v-icon>mdi-clippy</v-icon>
                </v-list-item-icon>
                <v-list-item-title>링크 복사</v-list-item-title>
              </v-list-item>
              <v-list-item @click="alertReport(obj.post)">
                <v-list-item-icon>
                  <v-icon>mdi-alert-box-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>신고</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-list>
        </v-menu>
      </v-row>
      <v-divider></v-divider>
      <div class="title">
        <div v-if="obj.post.title !== null">
          <p class="font-weight-bold text-center">{{ obj.post.title }}</p>
        </div>
        <Viewer
          :options="tuiOptions"
          :key="contentMoreMap[obj.post.postNo] ? 'fullContent' : 'lessContent'"
          :initialValue="getContentToShow(obj.post)"
        ></Viewer>
        <div v-if="shouldShowMoreLessButton(obj.post)" class="text-right pr-3">
          <v-btn
            icon
            plain
            retain-focus-on-click
            @click="toggleContentMore(obj.post)"
          >
            <span v-if="contentMoreMap[obj.post.postNo]" class="text-caption"
              >이전으로</span
            >
            <span v-else class="text-caption">...더보기</span>
            <v-icon
              >{{
                contentMoreMap[obj.post.postNo]
                  ? "mdi-chevron-up"
                  : "mdi-chevron-down"
              }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-carousel
        hide-delimiters
        height="auto"
        class="py-6"
        v-if="obj.files && obj.files.length > 0"
      >
        <v-carousel-item v-for="(item, index) in obj.files" :key="index">
          <v-img aspect-ratio="1.7" max-height="300" contain :src="item.path" />
        </v-carousel-item>
      </v-carousel>
      <v-divider></v-divider>
      <post-bottom-component :post-no="obj.post.postNo" />
    </v-card>
    <infinite-loading
      spinner="waveDots"
      @infinite="infiniteHandler"
      v-if="postList && postList.length > 0"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </v-sheet>
</template>
