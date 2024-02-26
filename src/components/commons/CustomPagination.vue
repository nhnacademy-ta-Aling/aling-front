<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    pageBtnLength: {
      type: Number,
      default: 5,
    },
    totalPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    start() {
      let start =
        parseInt(this.currentPage / this.pageBtnLength) * this.pageBtnLength;
      if (start < 0) {
        return 0;
      } else return start;
    },
    end() {
      let end = this.start + this.pageBtnLength - 1;
      if (end < this.totalPage) return end;
      else return this.totalPage - 1;
    },
    size() {
      return this.end - this.start + 1;
    },
  },
};
</script>

<template>
  <div>
    <v-btn
      icon
      color="accent"
      :disabled="currentPage === 0"
      @click="$emit('clickPageBtn', currentPage - 1)"
    >
      <v-icon>mdi-menu-left</v-icon>
    </v-btn>
    <v-btn
      icon
      color="primary"
      v-for="index in size"
      :key="start + index - 1"
      @click="$emit('clickPageBtn', start + index - 1)"
      :class="{ 'custom-bold': start + index - 1 === currentPage }"
    >
      {{ start + index }}
    </v-btn>
    <v-btn
      icon
      color="accent"
      :disabled="currentPage === totalPage - 1"
      @click="$emit('clickPageBtn', currentPage + 1)"
    >
      <v-icon>mdi-menu-right</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.custom-bold {
  font-weight: 900;
}
</style>
