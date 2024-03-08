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
      openModifyModal: false,
      openDeleteModal: false,
      categoryName: "",
      modifyCategoryNo: null,
      categoryOldName: "",
      categoryModifyName: "",
      bandNo: null,
      deleteCategoryNo: null,
      validMessage: "",
      modifyValidMessage: "",
      deleteValidMessage: "",
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
          this.loading = false;
          this.bandCategoryList = response.data;
        })
        .catch(() => {
          alert("server error!");
        });
    },
    clickMakeCategory() {
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
    clickModifyCategory() {
      if (this.categoryModifyName === "") {
        this.modifyValidMessage = "카테고리 명을 입력해주세요.";
        return;
      }
      if (this.categoryModifyName.length > 10) {
        this.modifyValidMessage = "10자 이내로 입력해주세요.";
        return;
      }

      if (
        this.bandCategoryList.some(
          (bandCategory) => bandCategory.name === this.categoryModifyName
        )
      ) {
        this.modifyValidMessage = "중복 카테고리 등록은 불가능합니다.";
        return;
      }

      const bandHeader = Header.X_BAND_NO;
      const headers = {
        "Content-Type": "application/json",
        [bandHeader]: this.bandNo,
      };
      const data = {
        bandPostTypeName: this.categoryModifyName,
      };

      this.$axios
        .put(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/post-types/" +
            this.modifyCategoryNo,
          JSON.stringify(data),
          { headers }
        )
        .then(() => {
          this.clickCloseModifyModal();
          this.fetchData();
        })
        .catch(() => {
          alert("server error!");
        });
    },
    clickDeleteCategory() {
      const bandHeader = Header.X_BAND_NO;
      const headers = {
        "Content-Type": "application/json",
        [bandHeader]: this.bandNo,
      };

      this.$axios
        .delete(
          "/user/api/v1/bands/" +
            this.$route.params.bandName +
            "/post-types/" +
            this.deleteCategoryNo,
          { headers }
        )
        .then(() => {
          this.clickCloseDeleteModal();
          this.fetchData();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.deleteValidMessage = "관련 게시글이 존재합니다.";
          } else {
            alert("server error!");
          }
        });
    },
    clickOpenMakeModal() {
      this.openMakeModal = true;
    },
    clickCloseMakeModal() {
      this.openMakeModal = false;
    },
    clickOpenModifyModal(bandPostTypeNo, categoryName) {
      this.modifyCategoryNo = bandPostTypeNo;
      this.categoryOldName = categoryName;
      this.categoryModifyName = categoryName;
      this.openModifyModal = true;
    },
    clickCloseModifyModal() {
      this.modifyCategoryNo = null;
      this.categoryOldName = null;
      this.categoryModifyName = null;
      this.openModifyModal = false;
    },
    clickOpenDeleteModal(bandPostTypeNo) {
      this.deleteCategoryNo = bandPostTypeNo;
      this.openDeleteModal = true;
    },
    clickCloseDeleteModal() {
      this.deleteCategoryNo = null;
      this.openDeleteModal = false;
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
                    @click="
                      clickOpenModifyModal(
                        bandCategory.bandPostTypeNo,
                        bandCategory.name
                      )
                    "
                    >수정
                  </v-btn>
                </td>
                <td class="custom-td-max-width-2">
                  <v-btn
                    plain
                    color="error"
                    v-if="bandCategory.name !== 'default'"
                    @click="clickOpenDeleteModal(bandCategory.bandPostTypeNo)"
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

    <v-dialog v-model="openModifyModal" max-width="500px">
      <v-card>
        <v-card-title>카테고리 수정</v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <br />
        <v-card-text class="d-flex">
          <br />
          <label class="mr-auto custom-label">카테고리명</label>
          <v-text-field
            solo
            class="custom-inline pa-2"
            v-model.trim="categoryModifyName"
            placeholder="Category Name"
            maxlength="10"
            required
            :error-messages="modifyValidMessage"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn plain @click="clickCloseModifyModal">취소</v-btn>
          <v-btn plain color="primary" @click="clickModifyCategory()"
            >수정
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="openDeleteModal" max-width="500px">
      <v-card>
        <v-card-title>카테고리 삭제</v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <br />
        <v-card-text class="d-flex">
          <br />
          <label class="mr-auto custom-label"
            >해당 카테고리에 작성된 게시글이 있는 경우 삭제가 불가능합니다.
            삭제하시겠습니까?</label
          >
          <p class="error">{{ this.deleteValidMessage }}</p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn plain @click="clickCloseDeleteModal">취소</v-btn>
          <v-btn plain color="error" @click="clickDeleteCategory()"
            >삭제
          </v-btn>
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

.error {
  color: red;
}
</style>
