<script>
import MyPageLeftNavBar from "@/pages/mypage/MyPageLeftNavBar.vue";

export default {
  components: { MyPageLeftNavBar },
};
</script>

<template>
  <v-row>
    <my-page-left-nav-bar class="hidden-sm-and-down" />
    <v-col>
      <router-view />
    </v-col>
  </v-row>
</template>

<style scoped></style>
