<script>
import { BandUserRole } from "@/main";

export default {
  computed: {
    BandUserRole() {
      return BandUserRole;
    },
  },
  data() {
    return {
      myBandList: null,
      creator: "",
      admin: "",
    };
  },
  created() {
    this.fetchData();
    this.setChip();
    window.addEventListener("resize", this.setChip);
  },
  destroyed() {
    window.removeEventListener("resize", this.setChip);
  },
  methods: {
    fetchData() {
      this.$axios
        .get("/user/api/v1/users/my-bands")
        .then((response) => {
          this.myBandList = response.data;
        })
        .catch(() => {
          alert("server error");
        });
    },
    setChip() {
      this.creator = (() => {
        if (window.innerWidth >= 1910) return "CREATOR";
        else if (window.innerWidth >= 1300) return "C";
        else return "";
      })();
      this.admin = (() => {
        if (window.innerWidth >= 1910) return "ADMIN";
        else if (window.innerWidth >= 1300) return "A";
        else return "";
      })();
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
                    <v-col cols="4" class="text-right">
                      <v-chip
                        v-if="
                          myBand.bandUserRoleNo ===
                            BandUserRole.BAND_ROLE_CREATOR && creator !== ''
                        "
                        v-model="creator"
                        close-icon="mdi-close-outline"
                        color="blue lighten-1"
                        small
                        outlined
                      >
                        {{ creator }}
                      </v-chip>
                      <v-chip
                        v-if="
                          myBand.bandUserRoleNo ===
                            BandUserRole.BAND_ROLE_ADMIN && admin !== ''
                        "
                        v-model="admin"
                        close-icon="mdi-close-outline"
                        color="deep-purple lighten-1"
                        small
                        outlined
                      >
                        {{ admin }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </template>

              <router-link
                v-if="myBand.bandUserRoleNo !== BandUserRole.BAND_ROLE_USER"
                class="remove-line"
                :to="{ path: '/my-page/bands/' + myBand.name }"
              >
                <v-list-item>
                  <v-list-item-title>기본 정보 관리</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link
                v-if="myBand.bandUserRoleNo !== BandUserRole.BAND_ROLE_USER"
                class="remove-line"
                :to="{ path: '/my-page/bands/' + myBand.name + '/categories' }"
              >
                <v-list-item>
                  <v-list-item-title>카테고리 관리</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link
                v-if="myBand.bandUserRoleNo !== BandUserRole.BAND_ROLE_USER"
                class="remove-line"
                :to="{ path: '/my-page/bands/' + myBand.name + '/band-users' }"
              >
                <v-list-item>
                  <v-list-item-title>그룹 회원 관리</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link
                class="remove-line"
                :to="{ path: '/my-page/bands/' + myBand.name + '/leave' }"
              >
                <v-list-item>
                  <v-list-item-title class="font-red"
                    >그룹 탈퇴
                  </v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link
                v-if="myBand.bandUserRoleNo === BandUserRole.BAND_ROLE_CREATOR"
                class="remove-line"
                :to="{ path: '/my-page/bands/' + myBand.name + '/closing' }"
              >
                <v-list-item>
                  <v-list-item-title class="font-red"
                    >그룹 삭제
                  </v-list-item-title>
                </v-list-item>
              </router-link>
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
