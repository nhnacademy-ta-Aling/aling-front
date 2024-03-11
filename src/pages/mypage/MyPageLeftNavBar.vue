<script>
export default {};
</script>

<template>
  <v-col cols="3">
    <v-sheet rounded="lg" min-height="300">
      <v-list dense class="pl-3">
        <v-subheader>회원 관리</v-subheader>
        <v-subheader>게시글 관리</v-subheader>
        <v-list-item-group>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-title>내 게시글</v-list-item-title>
            </template>
            <router-link
              :to="{ path: '/my-page/normal-posts' }"
              class="remove-line"
            >
              <v-list-item class="sub-list">
                <v-list-item-title>일반 게시글</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link
              :to="{ path: '/my-page/band-posts' }"
              class="remove-line"
            >
              <v-list-item class="sub-list">
                <v-list-item-title>그룹 게시글</v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<style scoped>
.remove-line {
  text-decoration: none;
  color: inherit;
}

.sub-list {
  padding-left: 8%;
}
</style>
