<template>
  <div>
    <custom-header />
    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import CustomHeader from "@/components/index/CustomHeader.vue";

export default {
  name: "index-page",
  components: {
    CustomHeader,
  },

  data: () => ({
    //
  }),
};
</script>
