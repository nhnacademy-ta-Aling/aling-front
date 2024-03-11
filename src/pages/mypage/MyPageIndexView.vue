<script>
import CustomMyPageHeader from "@/pages/mypage/header/CustomMyPageHeader.vue";

export default {
  name: "my-page-index-page",
  components: {
    CustomMyPageHeader,
  },
};
</script>

<template>
  <div>
    <custom-my-page-header />
    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>
