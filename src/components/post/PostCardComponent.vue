<script>
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.js";

import "prismjs/themes/prism-solarizedlight.css";
import { Viewer } from "@toast-ui/vue-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import PostBottomComponent from "@/components/post/PostBottomComponent.vue";
import PostHeaderComponent from "@/components/post/PostHeaderComponent.vue";
import Prism from "prismjs";

export default {
  components: {
    PostHeaderComponent,
    PostBottomComponent,
    Viewer,
  },
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tuiOptions: {
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
      },
      contentMore: false,
      isReplyViewed: false,
    };
  },
  methods: {
    toggleContentMore() {
      this.contentMore = !this.contentMore;
    },
    getContentToShow() {
      return this.contentMore
        ? this.postData.post.content
        : this.postData.post.content.substring(0, 100);
    },
  },
  computed: {
    shouldShowMoreLessButton() {
      return this.postData && this.postData.post.content.length > 100;
    },
  },
};
</script>

<template>
  <v-card>
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
  </v-card>
</template>
