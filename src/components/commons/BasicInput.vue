<template>
  <input />
</template>

<script>
export default {
  name: "BasicInput",
};
</script>

<style scoped lang="scss">
input {
  background-color: white;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #888888;
}

input:focus {
  outline: none;
  border-bottom: 1px solid #3d6bff;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: #3d6bff;
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
