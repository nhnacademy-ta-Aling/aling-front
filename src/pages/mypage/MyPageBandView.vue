<script>
import MyPageBandLeftNavBar from "@/pages/mypage/MyPageBandLeftNavBar.vue";

export default {
  components: { MyPageBandLeftNavBar },
};
</script>

<template>
  <v-row>
    <my-page-band-left-nav-bar class="hidden-sm-and-down" />
    <v-col>
      <router-view />
    </v-col>
  </v-row>
</template>

<style scoped></style>
