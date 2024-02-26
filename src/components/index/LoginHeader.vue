<script setup></script>

<template>
  <div>
    <v-app-bar app color="white" light :elevatio="2" height="55em">
      <v-spacer class="hidden-md-and-up" />
      <v-app-bar-title class="hidden-sm-and-down">
        <img src="@/assets/logo.svg" class="img-logo" alt="logo" />
      </v-app-bar-title>
      <v-app-bar-title class="hidden-md-and-up" style="margin-left: 2em">
        <img src="@/assets/logo.svg" class="img-logo" alt="logo" />
      </v-app-bar-title>
      <v-spacer class="hidden-md-and-up" />
      <v-btn icon class="hidden-md-and-up">
        <router-link to="/login"><v-icon>mdi-login</v-icon></router-link>
      </v-btn>
      <v-spacer class="hidden-sm-and-down" />
      <v-btn icon class="hidden-sm-and-down">
        <router-link to="/login"><v-icon>mdi-login</v-icon></router-link>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<style scoped>
.img-logo {
  margin-top: 0.5em;
  object-fit: fill;
}

.img-logo .mini {
  height: 3em;
  width: 3em;
}
</style>
