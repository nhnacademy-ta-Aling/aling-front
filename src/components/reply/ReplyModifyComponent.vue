<template>
  <v-responsive>
    <form @submit.prevent="submitReplyModify">
      <v-text-field
        name="content"
        label="수정할 내용을 적어주세요"
        :rules="rules"
        hide-details="auto"
        v-model="content"
      ></v-text-field>
      <v-col>
        <v-row>
          <v-col cols="2">
            <button type="submit" color="white darken-1" :disabled="!isValid">
              댓글 수정
            </button>
          </v-col>
          <v-col cols="2">
            <button @click="cancel">취소</button>
          </v-col>
        </v-row>
      </v-col>
    </form>
  </v-responsive>
</template>

<script>
export default {
  name: "reply-modify-component",
  props: {
    reply: {
      required: true,
      type: Object,
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
    cancel() {
      this.$emit("cancelModify");
    },
    submitReplyModify() {
      const replyData = {
        content: this.content,
      };
      console.log(replyData);
      this.$axios
        .put(
          "/post/api/v1/posts/" +
            this.reply.postNo +
            "/replies/" +
            this.reply.replyNo,
          replyData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.status);

          if (response.status === 200) {
            this.$axios
              .get("/post/api/v1/posts/" + this.reply.postNo + "/replies", {
                params: {
                  page: 0,
                  size: 5,
                },
              })
              .then(() => {
                location.reload();
              });
          }
        });
    },
  },
};
</script>
