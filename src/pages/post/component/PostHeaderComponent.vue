<script>
import PostThreeDotMenuComponent from "@/pages/post/component/PostThreeDotMenuComponent.vue";

export default {
  components: {
    PostThreeDotMenuComponent,
  },
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <v-row class="d-flex flex-row writer">
    <v-col cols="2">
      <v-avatar size="55">
        <v-img
          :src="postData.writer.filePath"
          :alt="postData.writer.username"
          v-if="postData.writer.filePath"
        ></v-img>
        <v-img v-else src="@/assets/user-no-image.png" alt="No Image" />
      </v-avatar>
    </v-col>
    <v-col class="flex-grow-1 align-self-start writer-name">
      <h5>
        {{ postData.writer.username }}
      </h5>
      <p class="text-caption" v-if="postData.post.modifyAt !== null">
        {{ postData.post.modifyAt }} (수정됨)
      </p>
      <p class="text-caption" v-else>
        {{ postData.post.createAt }}
      </p>
    </v-col>
    <post-three-dot-menu-component />
  </v-row>
</template>

<style scoped>
.writer {
  padding: 2% 4% 0 4%;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.writer-name {
  white-space: nowrap;
  padding-left: 2%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
