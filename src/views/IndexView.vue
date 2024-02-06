<template>
  <v-app id="inspire">
    <custom-header />
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <left-nav-bar />

          <custom-contents />

          <right-nav-bar />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CustomHeader from "@/components/index/CustomHeader.vue";
import LeftNavBar from "@/components/index/LeftNavBar.vue";
import CustomContents from "@/components/index/CustomContents.vue";
import RightNavBar from "@/components/index/RightNavBar.vue";

export default {
  name: "index-page",
  components: {
    CustomHeader,
    LeftNavBar,
    CustomContents,
    RightNavBar,
  },

  data: () => ({
    //
  }),
};
</script>
