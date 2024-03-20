<script>
export default {
  props: {
    postNo: {
      required: true,
      type: Number,
    },
  },
  data: () => ({
    content: "",
    rules: [
      (value) => !!value || "입력 칸이 비어있어요.",
      (value) => (value && value.length >= 2) || "길이가 너무 짧아요",
    ],
  }),
  computed: {
    isValid() {
      return this.content.length > 3;
    },
  },
  methods: {
    submitReply() {
      const replyData = {
        content: this.content,
        parentReplyNo: null,
      };

      console.log(replyData);
      this.$axios
        .post("/post/api/v1/posts/" + this.postNo + "/replies", replyData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.status);

          if (response.status === 201) {
            let updatedReplies;
            this.$axios
              .get("/post/api/v1/posts/" + this.postNo + "/replies/", {
                params: {
                  page: 0,
                  size: 5,
                },
              })
              .then((response) => {
                console.log(response.data.content);
                updatedReplies = response.data.content;
                this.$emit("replySubmitted", updatedReplies); // Emit event with new data
                this.$emit("stateLoaded");
              });
          }
        });
    },
  },
};
</script>

<template>
  <form @submit.prevent="submitReply">
    <v-text-field
      name="content"
      label="게시물에 댓글을 달아보세요"
      :rules="rules"
      hide-details="auto"
      v-model="content"
    ></v-text-field>
    <button type="submit" color="blue darken-1" :disabled="!isValid">
      댓글 작성
    </button>
  </form>
</template>
