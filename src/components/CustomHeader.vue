<script setup></script>

<template>
  <v-app-bar app color="white" flat>
    <img src="@/assets/logo.svg" class="col-2" alt="logo" />

    <input type="text" v-model="input" placeholder="Search..." />

    <v-tabs centered class="ml-n9" color="#3D6BFF" v-model="currentIndex">
      <v-tab v-for="(svg, index) in svgs" :key="svg">
        <a :href="generateLink(index)">
          <img :src="svg" alt="icon" />
        </a>
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
    path: ["/", "", "/group", ""],
  }),
  methods: {
    generateLink(index) {
      this.currentIndex = index;
      return this.path[index];
    },
  },
  computed: {
    currentIndex: function () {
      return this.path.indexOf(this.$route.path);
    },
  },
};
</script>
