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

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(234, 242, 255);
}

input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.fruit {
  background-color: rgb(97, 62, 252);
  cursor: pointer;
}

.error {
  background-color: tomato;
}
</style>
