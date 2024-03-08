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
        <v-row>
          <v-col>
            {{ reply.writer.username }}
          </v-col>
          <v-col class="text-caption" v-if="reply.reply.modifyAt !== null">
            {{ reply.reply.modifyAt }} (수정됨)
          </v-col>
          <v-col class="text-caption" v-else>
            {{ reply.reply.createAt }}
          </v-col>
        </v-row>
      </v-list-item-title>
      <v-list-item-content id="reply-content">
        {{ reply.reply.content }}
      </v-list-item-content>
    </v-list-item-content>
  </v-list-item>
</template>
