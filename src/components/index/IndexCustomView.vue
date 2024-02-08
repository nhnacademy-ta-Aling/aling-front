<script setup>
import RightNavBar from "@/components/index/RightNavBar.vue";
import LeftNavBar from "@/components/index/LeftNavBar.vue";
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

<style scoped lang="scss"></style>
