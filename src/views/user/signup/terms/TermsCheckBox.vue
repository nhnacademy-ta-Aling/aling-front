<script>
export default {
  name: "termsCheckBox",
  props: {
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <v-checkbox :id="id" :label="label"></v-checkbox>
</template>
