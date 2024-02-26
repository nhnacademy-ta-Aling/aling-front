<script>
import { defineComponent } from "vue";
import LeftNavBar from "@/components/index/LeftNavBar.vue";
import RightNavBar from "@/components/index/RightNavBar.vue";

export default defineComponent({
  components: { RightNavBar, LeftNavBar },
});
</script>

<template>
  <v-row>
    <left-nav-bar class="hidden-sm-and-down" />
    <v-col>
      <router-view />
    </v-col>
    <right-nav-bar class="hidden-sm-and-down" />
  </v-row>
</template>

<style scoped></style>
