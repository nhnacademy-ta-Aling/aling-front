<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <left-nav-bar class="hidden-sm-and-down" />

        <custom-contents />

        <right-nav-bar class="hidden-sm-and-down" />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import LeftNavBar from "@/components/index/LeftNavBar.vue";
import CustomContents from "@/components/index/CustomContents.vue";
import RightNavBar from "@/components/index/RightNavBar.vue";

export default {
  name: "index-page",
  components: {
    LeftNavBar,
    CustomContents,
    RightNavBar,
  },

  data: () => ({
    //
  }),
};
</script>
