<template>
  <v-col cols="12" sm="2">
    <v-sheet rounded="lg" min-height="300">
      <v-container>
        <v-btn @click="openModal" color="primary">그룹 생성</v-btn>
      </v-container>
    </v-sheet>
    <band-create-modal
      :value="bandModal"
      @input="bandModal = $event"
    ></band-create-modal>
  </v-col>
</template>

<script>
import BandCreateModal from "@/components/band/BandCreateModal.vue";

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
    BandCreateModal,
  },
};
</script>
