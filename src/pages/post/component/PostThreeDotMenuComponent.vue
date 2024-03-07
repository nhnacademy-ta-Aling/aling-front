<script>
export default {
  methods: {
    copyLink() {
      console.log("copy link");
    },
    alertReport() {
      console.log("신고");
    },
  },
};
</script>

<template>
  <v-menu offset-y rounded left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list dense rounded>
        <v-list-item @click="copyLink">
          <v-list-item-icon>
            <v-icon>mdi-clippy</v-icon>
          </v-list-item-icon>
          <v-list-item-title>링크 복사</v-list-item-title>
        </v-list-item>
        <v-list-item @click="alertReport">
          <v-list-item-icon>
            <v-icon>mdi-alert-box-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>신고</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-list>
  </v-menu>
</template>
