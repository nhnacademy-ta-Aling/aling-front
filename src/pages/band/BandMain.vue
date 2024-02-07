<script>
import RightNavBar from "@/components/index/RightNavBar.vue";
import LeftNavBar from "@/components/index/LeftNavBar.vue";

export default {
  components: { LeftNavBar, RightNavBar },
};
</script>

<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <left-nav-bar />

          <v-col cols="14" sm="8">
            <v-sheet min-height="70vh" rounded="lg"> </v-sheet>
          </v-col>

          <right-nav-bar />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
