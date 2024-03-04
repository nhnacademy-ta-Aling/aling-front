<script>
import { Viewer } from "@toast-ui/vue-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";

export default {
  components: {
    Viewer,
  },
  data() {
    return {
      tuiOptions: {
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
      },
      postData: null,
      contentMore: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios
        .get("/post/api/v1/band-posts/" + this.$route.params.postNo)
        .then((response) => {
          this.postData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    copyLink() {
      console.log("copy link");
    },
    alertReport() {
      console.log("신고");
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
      <v-row class="d-flex flex-row writer">
        <v-avatar size="55">
          <v-img
            v-if="postData.writer.filePath"
            :src="postData.writer.filePath"
            :alt="postData.writer.username"
          ></v-img>
          <v-img
            v-else
            src="../../assets/user-no-image.png"
            alt="No Image"
          ></v-img>
        </v-avatar>
        <div class="flex-grow-1 align-self-start writer-name">
          <h5>
            {{ postData.writer.username }}
          </h5>
          <p class="text-caption" v-if="postData.post.modifyAt !== null">
            {{ postData.post.modifyAt }} (수정됨)
          </p>
          <p class="text-caption" v-else>
            {{ postData.post.createAt }}
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
              <v-list-item @click="copyLink">
                <v-list-item-icon>
                  <v-icon>mdi-clippy</v-icon>
                </v-list-item-icon>
                <v-list-item-title>링크 복사</v-list-item-title>
              </v-list-item>
              <v-list-item @click="alertReport">
                <v-list-item-icon>
                  <v-icon>mdi-alert-box-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>신고</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-list>
        </v-menu>
      </v-row>
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
            <v-icon
              >{{ contentMore ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-carousel
        hide-delimiters
        height="auto"
        class="py-6"
        v-if="postData.post.file && postData.post.file.length > 0"
      >
        <v-carousel-item
          v-for="(item, index) in postData.post.file"
          :key="index"
        >
          <v-img aspect-ratio="1.7" max-height="300" contain :src="item.path" />
        </v-carousel-item>
      </v-carousel>
      <v-divider></v-divider>
      <v-bottom-navigation grow>
        <v-btn>
          <span>좋아요</span>
          <v-icon small>mdi-thumb-up-outline</v-icon>
        </v-btn>
        <v-btn>
          <span>스크랩</span>
          <v-icon small>mdi-bookmark-outline</v-icon>
        </v-btn>
        <v-btn>
          <span>댓글</span>
          <v-icon small>mdi-message-reply-text-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-responsive>
  </v-sheet>
</template>

<style scoped>
.main-body {
  padding-top: 1%;
}

.writer {
  padding: 2% 4% 0 4%;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.writer-name {
  white-space: nowrap;
  padding-left: 2%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  padding: 2% 2%;
}
</style>
