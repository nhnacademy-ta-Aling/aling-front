<template>
  <v-col cols="3">
    <v-sheet rounded="lg" min-height="300">
      <left-bar-band-list></left-bar-band-list>
    </v-sheet>
  </v-col>
</template>

<script>
import LeftBarBandList from "@/pages/band/LeftBarBandList.vue";

export default {
  name: "left-nav-bar",
  data() {
    return {
      bandModal: false,
    };
  },
  methods: {
    openModal() {
      this.bandModal = true;
    },
  },
  components: {
    LeftBarBandList,
  },
};
</script>
