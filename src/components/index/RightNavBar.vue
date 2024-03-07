<template>
  <v-col cols="3">
    <v-sheet rounded="lg" min-height="268">
      <v-container v-if="recruits">적절한 채용공고</v-container>
      <v-container v-else>적절한 채용공고</v-container>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  name: "right-nav-bar",
  data: () => ({
    recruits: null,
  }),
};
</script>
