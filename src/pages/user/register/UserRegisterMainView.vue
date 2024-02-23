<script setup>
import LoginHeader from "@/components/index/LoginHeader.vue";
</script>

<template>
  <div>
    <login-header></login-header>
    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
router-view {
  margin-top: 8em;
}
</style>
