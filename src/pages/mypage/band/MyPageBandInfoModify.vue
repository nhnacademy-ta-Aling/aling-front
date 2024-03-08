<script>
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { FileCategory, Header } from "@/main";

export default {
  components: {
    Editor,
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(to, from, next) {
    this.clearData();
    next();
    this.fetchData();
  },
  data() {
    return {
      bandDetail: null,
      avatarSize: 100,

      imageLoading: false,
      bandMainImageNo: null,
      bandMainImage: null,
      bandConvertImage: null,
      bandTmpImage: null,

      bandName: "",
      rewriteBandName: "",
      bandNameSuccess: false,
      bandNameMessage: "",

      immediateJoin: true,
      exposurePost: true,
      editorOptions: {
        minHeight: "100px",
        hideModeSwitch: true,
        toolbarItems: [["bold", "italic", "strike"]],
      },
      bandDescription: "",

      validMessage: "",
    };
  },
  computed: {
    checkBtn() {
      return (
        this.rewriteBandName.trim() === "" ||
        this.bandNameSuccess ||
        this.rewriteBandName === this.bandName
      );
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    clearData() {
      this.imageLoading = false;
      this.bandMainImageNo = null;
      this.bandMainImage = null;
      this.bandConvertImage = null;
      this.bandTmpImage = null;
    },
    async fetchData() {
      this.error = this.bandDetail = null;
      this.loading = true;
      await this.$axios
        .get("/user/api/v1/bands/" + this.$route.params.bandName)
        .then((response) => {
          this.loading = false;
          this.bandMainImageNo = response.data.bandInfo.fileNo;
          this.bandDetail = response.data.bandInfo;
          this.rewriteBandName = this.bandName = this.bandDetail.name;
          this.immediateJoin = this.bandDetail.isEnter;
          this.exposurePost = this.bandDetail.isViewContent;
          this.bandDescription = this.bandDetail.info;
          this.$refs.tuiEditor.invoke("setMarkdown", this.bandDescription);
        })
        .catch(() => {
          alert("server error!");
        });

      if (this.bandMainImageNo) {
        await this.$axios
          .get("/file/api/v1/files/" + this.bandMainImageNo)
          .then((response) => {
            this.bandMainImage = response.data.path;
          })
          .catch(() => {
            alert("이미지 로딩에 실패했습니다.");
          });
      }
      this.imageLoading = true;
    },
    upload(e) {
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      this.bandTmpImage = url;
      this.bandConvertImage = file;
    },
    enableCheckBtn() {
      this.bandNameSuccess = false;
      this.bandNameMessage = "";
      this.rewrite();
    },
    rewrite() {
      this.validMessage = "";
    },
    checkBandName() {
      if (this.rewriteBandName.trim() === "") {
        this.bandNameMessage = "그룹 명을 입력해주세요.";
        return;
      }

      this.$axios
        .get(
          "/user/api/v1/bands/check-duplicate?bandName=" +
            this.rewriteBandName.trim()
        )
        .then((response) => {
          if (response.data.isExist) {
            this.bandNameSuccess = false;
            this.bandNameMessage = "사용 불가능한 그룹명입니다.";
          } else {
            this.bandNameSuccess = true;
            this.bandNameMessage = "";
          }
        })
        .catch(() => {
          alert("server error!");
        });
    },
    uploadImage() {},
    getEditorInput() {
      this.bandDescription = this.$refs.tuiEditor.invoke("getMarkdown");
      this.rewrite();
    },
    async modifyGroup() {
      const data = {
        newBandName: this.rewriteBandName,
        isEnter: this.immediateJoin,
        isViewContent: this.exposurePost,
        bandInfo: this.bandDescription,
        fileNo: this.bandMainImageNo,
        // 그룹 이미지 파일 업로드 추가 예정
      };
      if (this.rewriteBandName.trim() === "") {
        this.validMessage = "그룹명을 입력해주세요.";
        return;
      }
      if (!this.bandNameSuccess && !(this.bandName === this.rewriteBandName)) {
        this.validMessage = "중복 검사를 해주세요.";
        return;
      }
      if (this.bandDescription.length >= 300) {
        this.validMessage = "그룹 소개글이 너무 깁니다.";
        return;
      }

      if (this.bandConvertImage !== null) {
        const fileHeader = Header.X_FILE_CATEGORY;
        let formData = new FormData();
        formData.append("files", this.bandConvertImage);

        if (this.bandMainImageNo === null) {
          await this.$axios
            .post("/file/api/v1/files", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                [fileHeader]: FileCategory.GROUP_PROFILE,
              },
            })
            .then((response) => {
              if (response.data.length > 0) {
                data.fileNo = response.data[0].fileNo;
              }
            })
            .catch(() => {
              alert("이미지 저장에 실패하였습니다.");
            });
        } else {
          await this.$axios
            .post("/file/api/v1/files?no=" + this.bandMainImageNo, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                [fileHeader]: FileCategory.GROUP_PROFILE,
              },
            })
            .then((response) => {
              if (response.data.length > 0) {
                data.fileNo = response.data[0].fileNo;
              }
            })
            .catch(() => {
              alert("이미지 저장에 실패하였습니다.");
            });
        }
      }

      const bandHeader = Header.X_BAND_NO;
      const headers = {
        "Content-Type": "application/json",
        [bandHeader]: this.bandDetail.bandNo,
      };
      this.$axios
        .put("/user/api/v1/bands/" + this.bandName, JSON.stringify(data), {
          headers: headers,
        })
        .then(() => {
          window.location.replace("/my-page/bands/" + this.rewriteBandName);
          alert("그룹 수정 완료");
        })
        .catch(() => {
          alert("server error!");
        });
    },
  },
};
</script>

<template>
  <v-responsive max-height="1000px">
    <!-- Vuetify Modal -->
    <v-card class="custom-card-margin" v-if="this.$refs.tuiEditor !== null">
      <v-card-title>그룹 기본 정보 수정</v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <br />
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="4" class="custom-center">
              <template v-if="imageLoading">
                <v-img
                  v-if="bandTmpImage !== null"
                  class="image-container"
                  alt="no image"
                  :src="bandTmpImage"
                >
                  <div class="plusBtn">
                    <input
                      accept="image/*"
                      @change="upload"
                      type="file"
                      id="file"
                    />
                    <label for="file">
                      <div class="btn-upload">+</div>
                    </label>
                  </div>
                </v-img>
                <v-img
                  v-else
                  class="image-container"
                  alt="no image"
                  :src="
                    bandMainImage
                      ? bandMainImage
                      : require('@/assets/band-no-image.png')
                  "
                >
                  <div class="plusBtn">
                    <input
                      accept="image/*"
                      @change="upload"
                      type="file"
                      id="file"
                    />
                    <label for="file">
                      <div class="btn-upload">+</div>
                    </label>
                  </div>
                </v-img>
              </template>
            </v-col>
            <v-col cols="8">
              <label class="custom-label custom-inline">그룹명</label>
              <v-text-field
                solo
                class="custom-inline"
                v-model.trim="rewriteBandName"
                @input="enableCheckBtn"
                placeholder="Band Name"
                maxlength="30"
                required
              ></v-text-field>
              <v-btn
                class="secondary"
                :disabled="checkBtn"
                @click="checkBandName"
                >중복 확인
              </v-btn>
              <v-messages
                :value="[bandNameMessage]"
                class="red--text"
              ></v-messages>

              <v-row>
                <v-col>
                  <label class="custom-label custom-inline"
                    >즉시 가입 허용</label
                  >
                  <v-switch
                    class="custom-inline"
                    color="indigo"
                    v-model="immediateJoin"
                  ></v-switch>
                </v-col>

                <v-col>
                  <label class="custom-label custom-inline"
                    >게시글 노출 허용</label
                  >
                  <v-switch
                    class="custom-inline"
                    color="indigo"
                    v-model="exposurePost"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <br />
          <br />

          <label class="custom-label">그룹 소개글</label>
          <br />
          <br />
          <Editor
            ref="tuiEditor"
            :options="editorOptions"
            height="300px"
            initialEditType="wysiwyg"
            :initialValue="this.bandDescription"
            previewStyle="vertical"
            @change="getEditorInput"
          >
          </Editor>

          <br />
          <v-messages
            :value="[validMessage]"
            class="red--text"
            v-if="validMessage !== ''"
          ></v-messages>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <!-- Create Group Button -->
        <v-btn @click="modifyGroup" color="primary">그룹 정보 수정</v-btn>
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

<style scoped>
.image-container {
  border-radius: 10px;
  border: 2px solid grey;
  padding: 3%;
  width: 80%;
  aspect-ratio: 1 / 1;
  max-width: 180px;
  object-fit: cover;
  display: flex;
  margin: auto;
}

.custom-center {
  justify-content: center;
  align-items: center;
}

.change-cursor {
  cursor: pointer;
}

.custom-label {
  font-size: 17px;
  font-weight: bold;
}

.custom-inline {
  margin-right: 2%;
  display: inline-block;
}

.custom-card-margin {
  padding: 1em;
}

.btn-upload {
  width: 25px;
  height: 25px;
  background: #fff;
  border: 2px solid rgb(77, 77, 77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;

  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
}

#file {
  display: none;
}
</style>
