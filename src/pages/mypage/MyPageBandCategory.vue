<script>
import { BandUserRole, Header } from "@/main";

export default {
  computed: {
    BandUserRole() {
      return BandUserRole;
    },
  },
  data() {
    return {
      size: 10,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
      bandCategoryList: null,

      openMakeModal: false,
      categoryName: "",
      bandNo: null,
      validMessage: "",
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.fetchData();
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios
        .get("/user/api/v1/bands/" + this.$route.params.bandName)
        .then((response) => {
          this.bandNo = response.data.bandInfo.bandNo;
        })
        .catch(() => {
          alert("server error!");
        });

      this.$axios
        .get(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/band-post-types"
        )
        .then((response) => {
          console.log(response.data);
          this.loading = false;
          this.bandCategoryList = response.data;
        })
        .catch(() => {
          alert("server error!");
        });
    },
    clickMakeCategory() {
      console.log("Test");
      if (this.categoryName === "") {
        this.validMessage = "카테고리 명을 입력해주세요.";
        return;
      }
      if (this.categoryName.length > 10) {
        this.validMessage = "10자 이내로 입력해주세요.";
        return;
      }

      const bandHeader = Header.X_BAND_NO;
      const headers = {
        "Content-Type": "application/json",
        [bandHeader]: this.bandNo,
      };
      const data = {
        name: this.categoryName,
      };

      this.$axios
        .post(
          "/user/api/v1/bands/" + this.$route.params.bandName + "/post-types",
          JSON.stringify(data),
          { headers }
        )
        .then(() => {
          this.clickCloseMakeModal();
          this.fetchData();
        })
        .catch(() => {
          alert("server error!");
        });
    },
    clickOpenMakeModal() {
      this.openMakeModal = true;
    },
    clickCloseMakeModal() {
      this.openMakeModal = false;
    },
  },
};
</script>

<template>
  <v-responsive max-height="1500px">
    <v-card class="custom-card-margin">
      <v-card-title class="d-flex">
        <span class="mr-auto">카테고리 관리</span>
        <v-btn color="indigo lighten-5" class="pa-2" @click="clickOpenMakeModal"
          >카테고리 생성
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <v-card-text>
        <v-simple-table>
          <template>
            <tbody>
              <tr
                v-for="bandCategory in bandCategoryList"
                :key="bandCategory.name"
                class="custom-table-row"
              >
                <td>
                  {{ bandCategory.name }}
                </td>

                <td class="custom-td-max-width-2">
                  <v-btn
                    plain
                    v-if="bandCategory.name !== 'default'"
                    color="primary"
                    >수정
                  </v-btn>
                </td>
                <td class="custom-td-max-width-2">
                  <v-btn
                    plain
                    color="error"
                    v-if="bandCategory.name !== 'default'"
                    >삭제
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="openMakeModal" max-width="500px">
      <v-card>
        <v-card-title>카테고리 생성</v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <br />
        <v-card-text class="d-flex">
          <br />
          <label class="mr-auto custom-label">카테고리명</label>
          <v-text-field
            solo
            class="custom-inline pa-2"
            v-model.trim="categoryName"
            placeholder="Category Name"
            maxlength="10"
            required
            :error-messages="validMessage"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn plain @click="clickCloseMakeModal">취소</v-btn>
          <v-btn plain color="primary" @click="clickMakeCategory">생성</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-responsive>
</template>

<style scoped>
.custom-card-margin {
  padding: 1em;
}

.custom-td-max-width-2 {
  width: 10px !important;
}

.custom-label {
  padding-top: 1.4em;
  padding-right: 0.5em;
  font-size: 17px;
  font-weight: bold;
}

.custom-inline {
  margin-right: 2%;
  display: inline-block;
  width: 60%;
}
</style>
