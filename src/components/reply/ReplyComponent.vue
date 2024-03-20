<script>
import ReplyWriterComponent from "@/components/reply/ReplyWriterComponent.vue";
import ReplyDotMenuComponent from "@/components/reply/ReplyDotMenuComponent.vue";
import ReplyModifyComponent from "@/components/reply/ReplyModifyComponent.vue";

export default {
  components: {
    ReplyModifyComponent,
    ReplyDotMenuComponent,
    ReplyWriterComponent,
  },
  props: {
    reply: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tryModify: false,
    };
  },
  methods: {
    modify() {
      this.tryModify = true;
    },
    cancelModify() {
      this.tryModify = false;
    },
  },
};
</script>

<template>
  <v-list-item color="white" class="ma-1">
    <v-col>
      <v-row id="reply-card">
        <v-col cols="1">
          <reply-writer-component :writer="reply.writer" />
        </v-col>
        <v-col>
          <v-list-item-content id="reply-detail">
            <v-list-item-title id="reply-write-info">
              <v-row>
                <v-col>
                  {{ reply.writer.username }}
                </v-col>
                <v-col
                  class="text-caption"
                  v-if="reply.reply.modifyAt !== null"
                >
                  {{ reply.reply.modifyAt }} (수정됨)
                </v-col>
                <v-col class="text-caption" v-else>
                  {{ reply.reply.createAt }}
                </v-col>
                <v-col cols="2">
                  <reply-dot-menu-component
                    @modify="modify"
                    :post-no="reply.reply.postNo"
                    :reply-no="reply.reply.replyNo"
                  />
                </v-col>
              </v-row>
            </v-list-item-title>
            <v-list-item-content id="reply-content">
              {{ reply.reply.content }}
            </v-list-item-content>
          </v-list-item-content>
        </v-col>
      </v-row>
      <v-row id="modify-form" v-if="tryModify">
        <reply-modify-component
          @replySubmitted="updateReplies"
          @cancelModify="cancelModify"
          :reply="reply.reply"
        />
      </v-row>
    </v-col>
  </v-list-item>
</template>
