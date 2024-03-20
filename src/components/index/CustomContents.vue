<script>
import InfiniteLoading from "vue-infinite-loading";
import { PostListPlaceholder } from "@/pages/post/script/ContentPlaceHolder";
import PostCardComponent from "@/components/post/PostCardComponent.vue";

export default {
  components: {
    PostCardComponent,
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
      this.$axios
        .get("/post/api/v1/posts?page=" + this.page + "&size=" + this.size)
        .then((response) => {
          if (response.data.content.length) {
            this.postList = this.postList.concat(response.data.content);
            this.page++;
          }
        })
        .catch((error) => {
          this.error = error.toString();
          this.postList = this.postList.concat(PostListPlaceholder);
        });
    },
    openBandMemberModal() {
      this.memberModal = true;
    },
    infiniteHandler($state) {
      console.log("infinite call()");
      this.$axios
        .get("/post/api/v1/posts?page=" + this.page + "&size=" + this.size)
        .then((response) => {
          if (response.data.content.length) {
            this.postList = this.postList.concat(response.data.content);
            $state.loaded();
            this.page++;
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
    <v-responsive class="mx-6 mb-12" v-for="obj in postList" :key="obj.postNo">
      <post-card-component :post-data="obj" />
    </v-responsive>
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
