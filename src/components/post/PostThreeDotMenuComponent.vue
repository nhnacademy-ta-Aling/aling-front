<script>
export default {
  props: {
    postNo: {
      required: true,
      type: Number,
    },
  },
  methods: {
    copyLink(post) {
      console.log("링크가 복사되었습니다. PostNo:", post);
    },
    alertReport(post) {
      console.log("신고되었습니다. PostNo:", post);
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
        <v-list-item @click="copyLink(postNo)">
          <v-list-item-icon>
            <v-icon>mdi-clippy</v-icon>
          </v-list-item-icon>
          <v-list-item-title>링크 복사</v-list-item-title>
        </v-list-item>
        <v-list-item @click="alertReport(postNo)">
          <v-list-item-icon>
            <v-icon>mdi-alert-box-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>신고</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-list>
  </v-menu>
</template>
