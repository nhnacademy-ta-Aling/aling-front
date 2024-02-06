<template>
  <router-view />
</template>

<script>
export default {
  name: "index-view",

  data: () => ({
    //
  }),
};
</script>

<style>
.v-application {
  font-family: "NanumBarunGothic", sans-serif !important;
}

@font-face {
  font-family: "NanumBarunGothic";
  src: url("assets/fonts/NanumGothic.ttf") format("truetype");
  font-weight: 400;
}

@font-face {
  font-family: "NanumBarunGothic";
  src: url("assets/fonts/NanumGothicLight.ttf") format("truetype");
  font-weight: 300;
}

@font-face {
  font-family: "NanumBarunGothic";
  src: url("assets/fonts/NanumGothicBold.ttf") format("truetype");
  font-weight: 700;
}

@font-face {
  font-family: "NanumBarunGothic";
  src: url("assets/fonts/NanumGothicExtraBold.ttf") format("truetype");
  font-weight: 900;
}
</style>
