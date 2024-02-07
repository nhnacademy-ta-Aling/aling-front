<script>
export default {
  name: "articleTitle",
  props: {
    articleTitle: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <h3 class="align-self-center v-row">{{ articleTitle }}</h3>
</template>

<style scoped lang="scss">
h3 {
  font-size: 1.17em;
}
</style>
