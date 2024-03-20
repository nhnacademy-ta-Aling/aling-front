<script>
import InfiniteLoading from "vue-infinite-loading";
import ReplyComponent from "@/components/reply/ReplyComponent.vue";
import ReplyInputComponent from "@/components/reply/ReplyInputComponent.vue";
import { RepliesPlaceholder } from "@/pages/post/script/ContentPlaceHolder";

export default {
  components: { ReplyInputComponent, ReplyComponent, InfiniteLoading },
  props: {
    postNo: {
      required: true,
      type: Number,
    },
  },
  data: () => ({
    replies: [],
    page: 0,
    size: 5,
    loading: false,
    scrollInvoked: 0,
  }),
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get("/post/api/v1/posts/" + this.postNo + "/replies", {
          params: {
            page: this.page,
            size: 5,
          },
        })
        .then((response) => (this.replies = response.data.content))
        .catch((error) => {
          console.log(error);
          this.replies = RepliesPlaceholder.content;
        });
    },
    infiniteHandler($state) {
      this.page = this.page + 1;
      console.log("infinite call()" + "page : " + this.page);
      this.$axios
        .get("/post/api/v1/posts/" + this.postNo + "/replies", {
          params: {
            page: this.page,
            size: 5,
          },
        })
        .then((response) => {
          if (response.data.content.length) {
            console.log(response.data.content);
            this.replies = this.replies.concat(response.data.content);
            $state.loaded();
            if (response.data.content.length < this.size) {
              $state.complete();
            }
          } else {
            $state.complete();
          }
        })
        .catch(() => {
          console.error("server error");
          $state.complete();
        });
    },
    updateReplies(newReplies) {
      console.log("update" + newReplies);
      this.replies = newReplies; // Update replies data in parent component
    },
    stateLoaded($state) {
      console.log("state loaded");
      $state.loaded();
    },
  },
};
</script>

<template>
  <v-responsive rounded="lg">
    <v-card
      class="overflow-y-auto"
      max-height="400"
      max-width="800"
      min-height="400"
      min-width="800"
    >
      <v-banner class="justify-center text-h5 font-weight-light" sticky>
        댓글
        <span class="font-weight-bold" v-text="replies.length"></span>
      </v-banner>
      <reply-component
        v-for="reply in replies"
        :key="reply.replyNo"
        :reply="reply"
      />
      <infinite-loading
        spinner="waveDots"
        @infinite="infiniteHandler"
        v-if="true"
      >
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </v-card>
    <reply-input-component @replySubmitted="updateReplies" :postNo="postNo" />
  </v-responsive>
</template>
