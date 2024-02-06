<script>
export default {
  name: "articleText",
  props: {
    articleText: {
      type: String,
      defaults: "",
    },
  },
};
</script>

<template>
  <p class="align-self-center v-row">{{ articleText }}</p>
</template>

<style scoped lang="scss">
p {
  font-size: 1em;
}
</style>
