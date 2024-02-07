<script>
import { defineComponent } from "vue";
import LeftNavBar from "@/components/index/LeftNavBar.vue";

export default defineComponent({
  components: { LeftNavBar },
});
</script>

<template>
  <v-row>
    <left-nav-bar class="hidden-sm-and-down" />
    <v-col>
      <v-sheet min-height="70vh" rounded="lg">
        <h1>This is Group page</h1>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped></style>
