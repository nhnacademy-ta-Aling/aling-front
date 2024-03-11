<script>
import { Viewer } from "@toast-ui/vue-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";
import PostBottomComponent from "@/pages/post/component/PostBottomComponent.vue";
import PostHeaderComponent from "@/pages/post/component/PostHeaderComponent.vue";

export default {
  components: {
    PostHeaderComponent,
    PostBottomComponent,
    Viewer,
  },
  data() {
    return {
      tuiOptions: {
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
      },
      postData: null,
      contentMore: false,
      isReplyViewed: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios
        .get("/post/api/v1/posts/" + this.$route.params.postNo, {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("access_token"),
          },
        })
        .then((response) => {
          this.postData = response.data;
          console.log(this.postData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleContentMore() {
      this.contentMore = !this.contentMore;
    },
    getContentToShow() {
      return this.contentMore
        ? this.postData.post.content
        : this.postData.post.content.substring(0, 300);
    },
  },
  computed: {
    shouldShowMoreLessButton() {
      return this.postData && this.postData.post.content.length > 300;
    },
  },
};
</script>

<template>
  <v-sheet min-height="70vh" rounded="lg" class="main-body">
    <v-responsive>
      <post-header-component :post-data="postData" />
      <br />
      <v-divider></v-divider>
      <div class="title">
        <div v-if="postData.post.title !== null">
          <p class="font-weight-bold text-center">
            {{ postData.post.title }}
          </p>
        </div>
        <Viewer
          :options="tuiOptions"
          :key="contentMore ? 'fullContent' : 'lessContent'"
          :initialValue="getContentToShow()"
        ></Viewer>
        <div v-if="shouldShowMoreLessButton" class="text-right pr-3">
          <v-btn icon plain retain-focus-on-click @click="toggleContentMore">
            <span v-if="contentMore" class="text-caption">이전으로</span>
            <span v-else class="text-caption">...더보기</span>
            <v-icon>
              {{ contentMore ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-carousel hide-delimiters height="auto" class="py-6">
        <v-carousel-item v-for="(item, index) in postData.files" :key="index">
          <v-img aspect-ratio="1.7" max-height="350" contain :src="item.path" />
        </v-carousel-item>
      </v-carousel>
      <post-bottom-component :postNo="postData.post.postNo" />
      <v-divider></v-divider>
    </v-responsive>
  </v-sheet>
</template>

<style scoped>
.main-body {
  padding-top: 1%;
}

.title {
  padding: 2% 2%;
}
</style>
