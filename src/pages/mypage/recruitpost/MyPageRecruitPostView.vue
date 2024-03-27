<script>
import MyPageRecruitPostLeftNavBar from "@/pages/mypage/recruitpost/MyPageRecruitPostLeftNavBar.vue";

export default {
  components: { MyPageRecruitPostLeftNavBar },
};
</script>

<template>
  <v-row>
    <my-page-recruit-post-left-nav-bar class="hidden-sm-and-down" />
    <v-col>
      <router-view />
    </v-col>
  </v-row>
</template>

<style scoped></style>
