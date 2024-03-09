<script>
import ReplyWriterComponent from "@/components/reply/component/ReplyWriterComponent.vue";

export default {
  components: { ReplyWriterComponent },
  props: {
    reply: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <v-list-item color="white" class="ma-1">
    <reply-writer-component :writer="reply.writer" />
    <v-list-item-content id="reply-write-info">
      <v-list-item-title>
        <p class="text-caption" v-if="reply.modifyAt !== null">
          {{ reply.modifyAt }} (수정됨)
        </p>
        <p class="text-caption" v-else>
          {{ reply.createAt }}
        </p>
      </v-list-item-title>
      <v-list-item-content id="reply-content">
        {{ reply.content }}
      </v-list-item-content>
    </v-list-item-content>
  </v-list-item>
</template>
