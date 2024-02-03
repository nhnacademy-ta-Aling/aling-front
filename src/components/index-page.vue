<template>
  <v-app id="inspire">
    <custom-header />
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <left-column />

          <middle-column />

          <right-column />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MiddleColumn from "@/components/middle-column.vue";
import leftColumn from "@/components/left-column.vue";
import rightColumn from "@/components/right-column.vue";
import customHeader from "@/components/custom-header.vue";

export default {
  name: "indexPage",

  components: {
    MiddleColumn,
    customHeader,
    leftColumn,
    rightColumn,
  },
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
  }),
};
</script>
