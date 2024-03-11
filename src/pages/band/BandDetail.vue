<script>
import BandUserListModal from "@/pages/band/BandUserListModal.vue";
import BandPostModal from "@/pages/band/BandPostModal.vue";

import { Viewer } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.js";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";

import InfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    Viewer,
    BandPostModal,
    BandUserListModal,
    InfiniteLoading,
  },
  data() {
    return {
      loading: false,
      imageLoading: false,
      bandImage: null,
      bandDetail: null,
      bandUserInfo: null,
      bandCategoryList: [],
      error: null,
      infoMore: false,
      infoIsLong: false,
      memberModal: false,
      tuiOptions: {
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
      },
      page: 0,
      size: 5,
      postList: [],
      contentMoreMap: {},
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
    async fetchData() {
      this.error = this.bandDetail = null;
      this.loading = true;
      this.page = 0;
      this.postList = [];
      await this.$axios
        .get("/user/api/v1/bands/" + this.$route.params.bandName)
        .then((response) => {
          this.loading = false;
          this.bandDetail = response.data.bandInfo;
          this.bandUserInfo = response.data.bandUserInfo;
          this.$axios
            .get(
              "/post/api/v1/band-post-types?bandNo=" + this.bandDetail.bandNo
            )
            .then((response) => {
              this.bandCategoryList = response.data;
            })
            .catch(() => {
              alert("server error!!");
            });
          this.$axios
            .get(
              "/post/api/v1/bands/" +
                this.bandDetail.bandNo +
                "/posts?page=" +
                this.page +
                "&size=" +
                this.size
            )
            .then((response) => {
              if (response.data.content.length) {
                this.postList = this.postList.concat(response.data.content);
                this.page++;
                response.data.content.forEach((post) => {
                  this.$set(this.contentMoreMap, post.post.postNo, false);
                });
              }
            });
        })
        .catch((error) => {
          this.error = error.toString();
        });

      if (this.bandDetail.fileNo) {
        await this.$axios
          .get("/file/api/v1/files/" + this.bandDetail.fileNo)
          .then((response) => {
            this.bandImage = response.data.path;
          })
          .catch(() => {
            alert("이미지 로딩에 실패했습니다.");
          });
      }
      this.imageLoading = true;
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
        : post.content.substring(0, 300);
    },
    shouldShowMoreLessButton(post) {
      return post.content.length > 300;
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
        .get(
          "/post/api/v1/bands/" +
            this.bandDetail.bandNo +
            "/posts?page=" +
            this.page +
            "&size=" +
            this.size
        )
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
  computed: {
    viewBandInfo() {
      return function (bandInfo) {
        this.infoIsLong =
          bandInfo.substring(0, window.innerWidth / 25).length <
          bandInfo.length;
        if (this.infoIsLong)
          return bandInfo.substring(0, window.innerWidth / 25) + " ...";
        else return bandInfo;
      };
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.progressCircular.$el.style.display = "none";
    }, 300);
  },
};
</script>

<template>
  <v-sheet color="" min-height="70vh" rounded="lg">
    <!--그룹 상세 정보-->
    <div v-if="bandDetail">
      <v-card class="post-card">
        <v-row>
          <v-col cols="2" class="more-dense">
            <v-img
              v-if="imageLoading"
              class="image-container"
              alt="no image"
              min-width="50px"
              :src="
                bandDetail.fileNo
                  ? bandImage
                  : require('@/assets/band-no-image.png')
              "
            ></v-img>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="8" class="more-dense">
                <v-card-title class="more-dense">
                  {{ bandDetail.name }}
                </v-card-title>
              </v-col>
              <v-col cols="4">
                <v-btn
                  @click="openBandMemberModal"
                  class="custom-banduser-btn more-dense"
                  >멤버 목록
                </v-btn>
                <band-user-list-modal
                  :value="memberModal"
                  :bandName="bandDetail.name"
                  @input="memberModal = $event"
                ></band-user-list-modal>
              </v-col>
            </v-row>
            <v-card-subtitle class="blurry-font more-dense">
              <p class="custom-inline">즉시 가입 여부</p>
              <p class="custom-inline" v-if="bandDetail.isEnter">O</p>
              <p class="custom-inline" v-else>X</p>
              <p class="custom-inline">게시글 공개 여부</p>
              <p class="custom-inline" v-if="bandDetail.isViewContent">O</p>
              <p class="custom-inline" v-else>X</p>
            </v-card-subtitle>
            <v-card-subtitle class="custom-bandInfo-subtitle">
              <v-row>
                <v-col cols="10">
                  <div v-if="!infoMore">
                    {{ viewBandInfo(bandDetail.info) }}
                  </div>
                  <div v-else>
                    {{ bandDetail.info }}
                  </div>
                </v-col>
                <v-col cols="2" class="text-right">
                  <span
                    v-if="infoIsLong && !infoMore"
                    @click="clickInfoMore"
                    class="material-symbols-outlined"
                  >
                    expand_more
                  </span>
                  <span
                    v-if="infoIsLong && infoMore"
                    @click="clickInfoLess"
                    class="material-symbols-outlined"
                  >
                    expand_less
                  </span>
                </v-col>
              </v-row>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <v-card class="band-post-input">
      <v-card-text>
        <v-row class="d-flex">
          <v-icon large color="light-blue darken-2" class="pa-2"
            >present_to_all
          </v-icon>
          <band-post-modal
            :bandDetail="bandDetail"
            :bandCategoryList="bandCategoryList"
            class="pa-2"
          ></band-post-modal>
        </v-row>
      </v-card-text>
    </v-card>
    <!--    그룹 게시물 리스트-->
    <div class="my-10 pb-1">
      <div class="text-center" v-if="!postList.length > 0">
        <v-progress-circular
          ref="progressCircular"
          indeterminate
          color="blue lighten-1"
        ></v-progress-circular>
      </div>
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
            :key="
              contentMoreMap[obj.post.postNo] ? 'fullContent' : 'lessContent'
            "
            :initialValue="getContentToShow(obj.post)"
          ></Viewer>
          <div
            v-if="shouldShowMoreLessButton(obj.post)"
            class="text-right pr-3"
          >
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
          v-if="obj.post.file && obj.post.file.length > 0"
        >
          <v-carousel-item v-for="(item, index) in obj.post.file" :key="index">
            <v-img
              aspect-ratio="1.7"
              max-height="300"
              contain
              :src="item.path"
            />
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
      </v-card>
      <infinite-loading
        spinner="waveDots"
        @infinite="infiniteHandler"
        v-if="postList && postList.length > 0"
      >
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </div>
  </v-sheet>
</template>

<style scoped>
.image-container {
  border-radius: 10px;
  border: 2px solid grey;
  top: 0.7em;
  margin-left: 45%;
  display: flex;
  align-items: center;
  aspect-ratio: 1/1;
}

.custom-bandInfo-subtitle {
  background-color: #f0f0f0;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 1em;
  margin-left: 1em;
  margin-right: 1em;
}

.text-right {
  text-align: right;
}

.blurry-font {
  font-size: 13px;
  opacity: 0.5;
}

.custom-inline {
  margin-right: 2%;
  display: inline-block;
}

.custom-banduser-btn {
  float: right;
  margin-right: 1.5em;
  margin-top: 1em;
}

.more-dense {
  margin-bottom: 0.1em;
  padding-bottom: 0.1em;
}

.band-post-input {
  margin: 5% 3% 3%;
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
