<script>
import ReplyListModal from "@/components/reply/ReplyListModal.vue";

export default {
  components: { ReplyListModal },
  data() {
    return {
      isReplyViewed: false,
    };
  },
};
</script>

<template>
  <v-bottom-navigation grow>
    <v-btn>
      <span>좋아요</span>
      <v-icon>mdi-thumb-up-outline</v-icon>
    </v-btn>
    <v-btn>
      <span>스크랩</span>
      <v-icon>mdi-bookmark-outline</v-icon>
    </v-btn>
    <v-btn @click="isReplyViewed = true">
      <span>댓글</span>
      <v-icon>mdi-message-reply-text-outline</v-icon>
    </v-btn>
    <v-overlay v-if="isReplyViewed">
      <v-layout>
        <button @click="isReplyViewed = false">댓글창 닫기</button>
      </v-layout>
      <reply-list-modal />
    </v-overlay>
  </v-bottom-navigation>
</template>
