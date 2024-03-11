<script>
export default {
  data: () => ({
    rules: [
      (value) => !!value || "입력 칸이 비어있어요.",
      (value) => (value && value.length >= 2) || "길이가 너무 짧아요",
    ],
  }),
};
</script>

<template>
  <form>
    <v-text-field
      label="게시물에 댓글을 달아보세요"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
    <button type="submit" class="mr-4 v-btn--icon">submit</button>
  </form>
</template>
