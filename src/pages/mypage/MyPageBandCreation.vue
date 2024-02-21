<script>
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      avatarSize: 100,
      bandName: "",
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
      return this.bandName.trim() === "" || this.bandNameSuccess;
    },
  },
  methods: {
    enableCheckBtn() {
      this.bandNameSuccess = false;
      this.bandNameMessage = "";
      this.rewrite();
    },
    rewrite() {
      this.validMessage = "";
    },
    checkBandName() {
      if (this.bandName.trim() === "") {
        this.bandNameMessage = "그룹 명을 입력해주세요.";
        return;
      }

      this.$axios
        .get(
          "/user/api/v1/bands/check-duplicate?bandName=" + this.bandName.trim()
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
    createGroup() {
      const data = {
        bandName: this.bandName,
        isEnter: this.immediateJoin,
        isViewContent: this.exposurePost,
        bandInfo: this.bandDescription,
        fileNo: null,
        // 그룹 이미지 파일 업로드 추가 예정
      };
      if (this.bandName.trim() === "") {
        this.validMessage = "그룹명을 입력해주세요.";
        return;
      }
      if (!this.bandNameSuccess) {
        this.validMessage = "중복 검사를 해주세요.";
        return;
      }
      if (this.bandDescription.length >= 300) {
        this.validMessage = "그룹 소개글이 너무 깁니다.";
        return;
      }

      this.$axios
        .post("/user/api/v1/bands", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          alert("그룹 생성 완료");
          this.closeModal();
        })
        .catch(() => {
          alert("server error!");
        });

      this.closeModal();
    },
  },
};
</script>

<template>
  <v-responsive max-height="1000px">
    <!-- Vuetify Modal -->
    <v-card class="custom-card-margin">
      <v-card-title>그룹 생성</v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <br />
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="4" class="custom-center">
              <v-img
                class="image-container change-cursor"
                alt="no image"
                src="../../assets/band-no-image.png"
                @click="uploadImage"
              ></v-img>
            </v-col>
            <v-col cols="8">
              <label class="custom-label custom-inline">그룹명</label>
              <v-text-field
                solo
                class="custom-inline"
                v-model.trim="bandName"
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
            previewStyle="vertical"
            @change="getEditorInput"
          >
          </Editor>

          <v-messages
            :value="[validMessage]"
            class="red--text"
            v-if="validMessage !== ''"
          ></v-messages>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <!-- Create Group Button -->
        <v-btn @click="createGroup" color="primary">그룹 생성</v-btn>
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
  font-size: 20px;
  font-weight: bold;
}

.custom-inline {
  margin-right: 2%;
  display: inline-block;
}

.custom-card-margin {
  padding: 1em;
}
</style>
