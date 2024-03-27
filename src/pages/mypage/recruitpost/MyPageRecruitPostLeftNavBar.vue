<script>
export default {};
</script>

<template>
  <v-col cols="3">
    <v-sheet rounded="lg" min-height="300">
      <v-list dense class="custom-list-margin">
        <v-subheader>채용공고 관리</v-subheader>
        <v-list-item-group>
          <router-link to="/my-page/recruit-posts" class="remove-line">
            <v-list-item>
              <v-list-item-title>채용공고 목록</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/my-page/recruit-posts/new" class="remove-line">
            <v-list-item>
              <v-list-item-title>채용공고 등록</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<style scoped>
.custom-list-margin {
  margin-left: 0.8em;
  margin-right: 0.8em;
}

.remove-line {
  text-decoration: none;
  color: inherit;
}

.font-red {
  color: #ff3f3f;
}
</style>
