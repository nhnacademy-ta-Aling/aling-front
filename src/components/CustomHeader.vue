<script setup></script>

<template>
  <v-app-bar app color="white" flat>
    <img src="@/assets/logo.svg" class="col-2" alt="logo" />

    <input type="text" v-model="input" placeholder="Search..." />

    <v-tabs centered class="ml-n9" color="#3D6BFF">
      <v-tab v-for="svg in svgs" :key="svg">
        <img :src="svg" alt="icon" />
      </v-tab>
    </v-tabs>

    <v-avatar class="hidden-sm-and-down" color="#3D6BFF" size="32" />
  </v-app-bar>
</template>

<script>
import svgs from "@/plugins/icon-parser";

export default {
  name: "custom-header",
  data: () => ({
    svgs,
  }),
};
</script>
