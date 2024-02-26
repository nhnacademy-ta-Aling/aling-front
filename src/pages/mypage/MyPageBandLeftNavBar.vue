<script>
const BandUserRole = Object.freeze({
  BAND_ROLE_CREATOR: 1,
  BAND_ROLE_ADMIN: 2,
  BAND_ROLE_USER: 3,
});
export default {
  data() {
    return {
      BandUserRole,
      myBandList: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios
        .get("/user/api/v1/users/my-bands")
        .then((response) => {
          this.myBandList = response.data;
          console.log(this.myBandList);
        })
        .catch(() => {
          alert("server error");
        });
    },
  },
};
</script>

<template>
  <v-col cols="3">
    <v-sheet rounded="lg" min-height="300">
      <v-list dense class="custom-list-margin">
        <v-subheader>그룹 관리</v-subheader>
        <v-list-item-group>
          <v-list-group>
            <template v-slot:activator>
              <router-link to="/my-page/bands" class="remove-line">
                <v-list-item-title>그룹 목록</v-list-item-title>
              </router-link>
              <v-spacer class="md1"></v-spacer>
            </template>
            <!-- 테스트 자료-->
            <v-list-group
              no-action
              sub-group
              v-for="myBand in myBandList"
              :key="myBand.bandNo"
            >
              <template v-slot:activator>
                <v-list-item-title>
                  <v-row>
                    <v-col cols="8">
                      {{ myBand.name }}
                    </v-col>
                    <v-col cols="4">
                      <v-chip
                        v-if="
                          myBand.bandUserRoleNo ===
                          BandUserRole.BAND_ROLE_CREATOR
                        "
                        close-icon="mdi-close-outline"
                        color="blue lighten-1"
                        small
                        outlined
                        >CREATOR
                      </v-chip>
                      <v-chip
                        v-if="
                          myBand.bandUserRoleNo === BandUserRole.BAND_ROLE_ADMIN
                        "
                        close-icon="mdi-close-outline"
                        color="deep-purple lighten-1"
                        small
                        outlined
                        >ADMIN
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </template>
              <v-list-item
                v-if="myBand.bandUserRoleNo === BandUserRole.BAND_ROLE_USER"
              >
                <v-list-item-title>그룹 탈퇴</v-list-item-title>
              </v-list-item>

              <v-list-item
                v-if="myBand.bandUserRoleNo !== BandUserRole.BAND_ROLE_USER"
              >
                <v-list-item-title>카테고리 관리</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="myBand.bandUserRoleNo !== BandUserRole.BAND_ROLE_USER"
              >
                <v-list-item-title>회원 관리</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="myBand.bandUserRoleNo !== BandUserRole.BAND_ROLE_USER"
              >
                <v-list-item-title>그룹 탈퇴</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="
                  myBand.bandUserInfobandUserRoleNo !==
                  BandUserRole.BAND_ROLE_USER
                "
              >
                <v-list-item-title>그룹 삭제</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <!-- 테스트 자료-->
          </v-list-group>
          <router-link to="/my-page/bands/new" class="remove-line">
            <v-list-item>
              <v-list-item-title>그룹 생성</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<style scoped>
.custom-list-margin {
  margin-left: 1em;
  margin-right: 1em;
}

.remove-line {
  text-decoration: none;
  color: inherit;
}
</style>
