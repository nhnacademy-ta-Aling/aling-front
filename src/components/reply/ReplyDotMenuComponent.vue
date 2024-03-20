<script>
export default {
  props: {
    postNo: {
      required: true,
      type: Number,
    },
    replyNo: {
      required: true,
      type: Number,
    },
  },
  methods: {
    copyLink(replyNo) {
      console.log("수정. reply no :", replyNo);
      this.$emit("modify");
    },
    alertReport(replyNo) {
      console.log("삭제. reply no:", replyNo);
      this.$axios
        .delete("/post/api/v1/posts/" + this.postNo + "/replies/" + replyNo)
        .then((response) => {
          console.log(response.statusText);
          if (response.status === 204) {
            location.reload();
          }
        });
    },
  },
};
</script>

<template>
  <v-menu offset-x rounded left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon color="white">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list dense rounded>
        <v-list-item @click="copyLink(replyNo)">
          <v-list-item-icon>
            <v-icon>mdi-clippy</v-icon>
          </v-list-item-icon>
          <v-list-item-title>수정</v-list-item-title>
        </v-list-item>
        <v-list-item @click="alertReport(replyNo)">
          <v-list-item-icon>
            <v-icon>mdi-alert-box-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>삭제</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-list>
  </v-menu>
</template>
