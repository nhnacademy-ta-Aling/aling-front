<script>
export default {
  props: {
    writer: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <v-list-item-avatar id="profile-thumbnail">
    <v-img
      v-if="writer.filePath"
      :src="writer.filePath"
      :alt="writer.username"
    ></v-img>
    <v-img v-else src="@/assets/user-no-image.png" alt="No Image"></v-img>
  </v-list-item-avatar>
</template>
