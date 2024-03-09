<script>
import ReplyComponent from "@/components/reply/component/ReplyComponent.vue";
import ReplyInputComponent from "@/components/reply/component/ReplyInputComponent.vue";

export default {
  components: { ReplyInputComponent, ReplyComponent },
  data: () => ({
    replies: null,
  }),
  mounted() {
    this.$axios
      .get("/post/api/v1/posts/" + this.$route.params.postNo + "/replies", {
        params: {
          page: 0,
          size: 5,
        },
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + this.$cookies.get("access_token"),
        },
        withCredentials: true,
      })
      .then((response) => (this.replies = response.data));
  },
};
</script>

<template>
  <v-responsive rounded="lg">
    <v-flex>
      <reply-component
        v-for="reply in replies.content"
        :key="reply.replyNo"
        :reply="reply"
      />
    </v-flex>
    <reply-input-component />
  </v-responsive>
</template>
