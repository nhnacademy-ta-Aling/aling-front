<script>
import RightNavBar from "@/components/RightNavBar.vue";
import LeftNavBar from "@/components/LeftNavBar.vue";
import CustomHeader from "@/components/CustomHeader.vue";

export default {
  components: { CustomHeader, LeftNavBar, RightNavBar },
};
</script>

<template>
  <v-app id="inspire">
    <custom-header />
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
