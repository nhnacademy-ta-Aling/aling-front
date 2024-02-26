<script>
import { BandUserRole, Header } from "@/main";
import CustomPagination from "@/components/commons/CustomPagination.vue";

export default {
  components: { CustomPagination },
  computed: {
    BandUserRole() {
      return BandUserRole;
    },
  },
  data() {
    return {
      size: 10,

      myInfo: "",
      bandInfo: "",
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
      bandUserList: "",

      creator: "",
      admin: "",
      checkDeskTop: false,
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.fetchData();
  },
  created() {
    this.fetchData();
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    fetchData() {
      this.error = this.bandInfo = null;
      this.loading = true;

      this.$axios
        .get("/user/api/v1/bands/" + this.$route.params.bandName)
        .then((response) => {
          this.loading = false;
          this.myInfo = response.data.bandUserInfo;
          this.bandInfo = response.data.bandInfo;
        })
        .catch(() => {
          alert("server error!");
        });

      this.$axios
        .get(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/users?page=" +
            this.pageNumber +
            "&size=" +
            this.size
        )
        .then((response) => {
          this.loading = false;
          this.pageNumber = response.data.pageNumber;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.bandUserList = response.data.content;
        })
        .catch(() => {
          alert("server error!");
        });
    },
    handleResize() {
      this.setChip();
      this.setMoreBar();
    },
    setMoreBar() {
      this.checkDeskTop = window.innerWidth > 580;
    },
    setChip() {
      this.creator = (() => {
        if (window.innerWidth >= 1000) return "CREATOR";
        else if (window.innerWidth >= 630) return "C";
        else return "";
      })();
      this.admin = (() => {
        if (window.innerWidth >= 1000) return "ADMIN";
        else if (window.innerWidth >= 630) return "A";
        else return "";
      })();
    },
    // btn 기능들
    clickUpdateToAdmin(userNo) {
      const bandHeader = Header.X_BAND_NO;
      const headers = {
        "Content-Type": "application/json",
        [bandHeader]: this.bandInfo.bandNo,
      };
      const data = {
        bandUserRoleNo: BandUserRole.BAND_ROLE_ADMIN,
      };
      this.$axios
        .put(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/users/" +
            userNo +
            "/role",
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then(() => {
          this.fetchData();
        })
        .catch(() => {
          alert("server error!");
        });
    },
    clickUpdateToUser(userNo) {
      const bandHeader = Header.X_BAND_NO;
      const headers = {
        "Content-Type": "application/json",
        [bandHeader]: this.bandInfo.bandNo,
      };
      const data = {
        bandUserRoleNo: BandUserRole.BAND_ROLE_USER,
      };
      this.$axios
        .put(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/users/" +
            userNo +
            "/role",
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then(() => {
          this.fetchData();
        })
        .catch(() => {
          alert("server error!");
        });
    },
    clickUpdateBlock(userNo) {
      const bandHeader = Header.X_BAND_NO;
      const headers = {
        [bandHeader]: this.bandInfo.bandNo,
      };
      this.$axios
        .put(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/users/" +
            userNo +
            "/block",
          null,
          {
            headers: headers,
          }
        )
        .then(() => {
          this.fetchData();
        })
        .catch(() => {
          alert("server error!");
        });
    },
    clickUpdateDelegation(userNo) {
      const bandHeader = Header.X_BAND_NO;
      const headers = {
        [bandHeader]: this.bandInfo.bandNo,
      };
      this.$axios
        .put(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/users/" +
            userNo +
            "/role-delegation",
          null,
          {
            headers: headers,
          }
        )
        .then(() => {
          this.fetchData();
        })
        .catch(() => {
          alert("server error!");
        });
    },
    updatePage(pageNum) {
      this.$axios
        .get(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/users?page=" +
            pageNum +
            "&size=" +
            this.size
        )
        .then((response) => {
          this.loading = false;
          this.pageNumber = response.data.pageNumber;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.bandUserList = response.data.content;
        })
        .catch(() => {
          alert("server error!");
        });
    },
  },
};
</script>

<template>
  <v-responsive max-height="1500px">
    <v-card class="custom-card-margin">
      <v-card-title>그룹 회원 관리</v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <v-card-text>
        <v-simple-table>
          <template>
            <tbody>
              <tr
                v-for="bandUser in bandUserList"
                :key="bandUser.userInfo.userNo"
                class="custom-table-row"
              >
                <td class="custom-td-max-width-picture">
                  <img
                    class="image-container"
                    width="100%"
                    style="max-width: 45px; min-width: 25px"
                    alt="no image"
                    src="../../assets/user-no-image.png"
                  />
                </td>
                <td class="justify-center">
                  {{ bandUser.userInfo.name }} &nbsp;

                  <v-chip
                    v-if="
                      bandUser.bandUserInfo.bandUserRoleNo ===
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
                      bandUser.bandUserInfo.bandUserRoleNo ===
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
                </td>
                <template v-if="checkDeskTop">
                  <td class="custom-td-max-width-1">
                    <v-btn
                      class="deep-purple lighten-5"
                      small
                      v-if="
                        bandUser.bandUserInfo.bandUserRoleNo ===
                        BandUserRole.BAND_ROLE_USER
                      "
                      @click="clickUpdateToAdmin(bandUser.userInfo.userNo)"
                      >Admin 권한 설정
                    </v-btn>
                    <v-btn
                      class="deep-purple lighten-5"
                      small
                      v-if="
                        bandUser.bandUserInfo.bandUserRoleNo ===
                        BandUserRole.BAND_ROLE_ADMIN
                      "
                      @click="clickUpdateToUser(bandUser.userInfo.userNo)"
                      >Admin 권한 해제
                    </v-btn>
                  </td>
                  <td class="custom-td-max-width-2">
                    <v-btn
                      class="blue lighten-5"
                      small
                      v-if="
                        myInfo.bandUserRoleNo ===
                          BandUserRole.BAND_ROLE_CREATOR &&
                        !(
                          bandUser.bandUserInfo.bandUserRoleNo ===
                          BandUserRole.BAND_ROLE_CREATOR
                        )
                      "
                      @click="clickUpdateDelegation(bandUser.userInfo.userNo)"
                      >위임
                    </v-btn>
                  </td>
                  <td class="custom-td-max-width-2">
                    <v-btn
                      class="red lighten-4"
                      small
                      v-if="
                        !(
                          myInfo.bandUserRoleNo === BandUserRole.BAND_ROLE_USER
                        ) &&
                        !(
                          bandUser.bandUserInfo.bandUserRoleNo ===
                          BandUserRole.BAND_ROLE_CREATOR
                        )
                      "
                      @click="clickUpdateBlock(bandUser.userInfo.userNo)"
                      >추방
                    </v-btn>
                  </td>
                </template>
                <!-- mobile version-->
                <template v-else>
                  <td class="text-right">
                    <v-menu rounded offset-y transition="slide-y-transition">
                      <template v-slot:activator="{ attr, on }">
                        <v-btn icon v-bind="attr" v-on="on">
                          <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>
                      <v-list dense>
                        <v-list-item
                          v-if="
                            bandUser.bandUserInfo.bandUserRoleNo ===
                            BandUserRole.BAND_ROLE_USER
                          "
                          @click="clickUpdateToAdmin(bandUser.userInfo.userNo)"
                        >
                          <v-list-item-title>ADMIN 권한 설정</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="
                            bandUser.bandUserInfo.bandUserRoleNo ===
                            BandUserRole.BAND_ROLE_ADMIN
                          "
                          @click="clickUpdateToUser(bandUser.userInfo.userNo)"
                        >
                          <v-list-item-title>Admin 권한 해제</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="
                            myInfo.bandUserRoleNo ===
                              BandUserRole.BAND_ROLE_CREATOR &&
                            !(
                              bandUser.bandUserInfo.bandUserRoleNo ===
                              BandUserRole.BAND_ROLE_CREATOR
                            )
                          "
                          @click="
                            clickUpdateDelegation(bandUser.userInfo.userNo)
                          "
                        >
                          <v-list-item-title>위임</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="
                            !(
                              myInfo.bandUserRoleNo ===
                              BandUserRole.BAND_ROLE_USER
                            ) &&
                            !(
                              bandUser.bandUserInfo.bandUserRoleNo ===
                              BandUserRole.BAND_ROLE_CREATOR
                            )
                          "
                          @click="clickUpdateBlock(bandUser.userInfo.userNo)"
                        >
                          <v-list-item-title>추방</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                </template>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <custom-pagination
        class="text-center"
        :currentPage="this.pageNumber"
        :pageBtnLength="5"
        :totalPage="this.totalPages"
        @clickPageBtn="updatePage"
      >
      </custom-pagination>
    </v-card>
  </v-responsive>
</template>

<style scoped>
.custom-card-margin {
  padding: 1em;
}

.image-container {
  border-radius: 10px;
  border: 1px solid grey;
  display: flex;
  align-items: center;
}

.custom-table-row {
  height: 60px;
}

.custom-td-max-width-picture {
  width: 70px !important;
}

.custom-td-max-width-1 {
  width: 90px !important;
}

.custom-td-max-width-2 {
  width: 30px !important;
}
</style>
