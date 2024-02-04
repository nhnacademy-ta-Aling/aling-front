<template>
  <v-app>
    <index-page></index-page>
  </v-app>
</template>

<script>
import indexPage from "@/components/index-page.vue";

export default {
  name: "app-view",
  components: {
    indexPage,
  },

  data: () => ({
    //
  }),
};
</script>
