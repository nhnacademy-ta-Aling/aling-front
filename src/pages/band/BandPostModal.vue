<script>
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { FileCategory } from "@/main";

export default {
  components: {
    Editor,
  },
  props: {
    bandDetail: Object,
  },
  data() {
    return {
      dialog: false,
      postTitle: "",
      postContent: "",
      files: [],
      postTitleValidMsg: "",
      postContentValidMsg: "",
      fileValidMsg: "",
      editorOptions: {
        previewStyle: "vertical",
        language: "ko",
        hideModeSwitch: true,
        placeholder: "내용을 입력해 주세요...",
        toolbarItems: [
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
          ["table", "link"],
          ["code", "codeblock"],
          ["scrollSync"],
        ],
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    getEditorInput() {
      this.postContent = this.$refs.tuiEditor.invoke("getMarkdown");
    },
    updateFiles(newFiles) {
      this.files = [...this.files, ...newFiles];
    },
    deleteFile(index) {
      this.files.splice(index, 1);
    },
    checkFileSize(file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      const maxSizeInMB = 45; // 하나 최대 가능 파일 크기 (50MB)
      return fileSizeInMB <= maxSizeInMB;
    },
    validatedInput() {
      let isValid = true;

      if (this.postTitle.trim().length === 0) {
        this.postTitleValidMsg = "제목을 입력해주세요.";
        isValid = false;
      } else if (this.postTitle.trim().length > 50) {
        this.postTitleValidMsg = "제목이 50자를 초과했습니다.";
        isValid = false;
      } else {
        this.postTitleValidMsg = "";
      }
      if (this.postContent.length === 0) {
        this.postContentValidMsg = "내용을 입력해주세요.";
        isValid = false;
      } else if (this.postContent.length > 10000) {
        this.postContentValidMsg = "10,000자를 초과했습니다.";
        isValid = false;
      } else {
        this.postContentValidMsg = "";
      }
      let totalSize = 0;
      for (const file of this.files) {
        if (!this.checkFileSize(file)) {
          this.fileValidMsg = "용량이 큰 파일이 있습니다. (약 50MB 미만)";
          isValid = false;
          return isValid;
        }
        totalSize += file.size;
      }
      const totalFileSize = totalSize / (1024 * 1024);
      const maxTotalSize = 270; // 최대 총 파일 크기 (300MB)
      if (totalFileSize > maxTotalSize) {
        this.fileValidMsg = "파일의 총 크기가 너무 큽니다. (약 300MB 미만)";
        isValid = false;
      }
      if (this.files.length > 10) {
        this.fileValidMsg = "파일은 10개 까지만 업로드 가능합니다.";
        isValid = false;
      } else {
        this.fileValidMsg = "";
      }
      return isValid;
    },
    submitPost() {
      if (this.validatedInput()) {
        const formData = new FormData();

        for (let i = 0; i < this.files.length; i++) {
          formData.append("files", this.files[i]);
        }

        if (this.files.length !== 0) {
          axios
            .post("/file/api/v1/files", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "X-File-Category": FileCategory.POST_ATTACH,
              },
            })
            .then((result) => {
              const data = {
                bandPostTitle: this.postTitle,
                bandPostContent: this.postContent,
                isOpen: this.bandDetail.isViewContent,
                bandPostTypeNo: 1,
                fileNoList: result.data.map((file) => file.fileNo),
              };

              axios
                .post("/post/api/v1/band-posts", JSON.stringify(data), {
                  headers: {
                    "Content-Type": "application/json",
                    "X-Band-User-No": 105,
                  },
                })
                .then(() => {
                  alert("게시글 작성 완료");
                  window.location.reload();
                })
                .catch(() => {
                  alert("server error!");
                });
            });
        } else {
          const data = {
            bandPostTitle: this.postTitle,
            bandPostContent: this.postContent,
            isOpen: this.bandDetail.isViewContent,
            bandPostTypeNo: 1,
            fileNoList: [],
          };
          axios
            .post("/post/api/v1/band-posts", JSON.stringify(data), {
              headers: {
                "Content-Type": "application/json",
                "X-Band-User-No": 105,
              },
            })
            .then(() => {
              alert("게시글 작성 완료");
              window.location.reload();
            })
            .catch(() => {
              alert("server error!");
            });
        }
        this.files = [];
        this.$refs.tuiEditor.invoke("setValue", "");
        this.postTitle = "";
        this.closeDialog();
      }
    },
  },
};
</script>

<template>
  <v-responsive max-height="500px">
    <v-btn rounded block outlined @click="openDialog()"> 게시글 작성</v-btn>
    <v-dialog v-model="dialog" max-width="1000">
      <v-card>
        <v-card-title class="text-sm-h5"> 그룹 게시글 작성</v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>

        <br />
        <v-container>
          <div class="post-body">
            <v-row>
              <v-text-field
                v-model="postTitle"
                :error-messages="postTitleValidMsg"
                :counter="50"
                label="게시글 제목"
              ></v-text-field>
            </v-row>

            <br />
            <br />
            <Editor
              ref="tuiEditor"
              height="300px"
              initialEditType="wysiwyg"
              :options="editorOptions"
              @change="getEditorInput"
            ></Editor>
            <div class="v-text-field__details">
              <div class="v-messages theme--light error--text" role="alert">
                <div class="v-messages__message editor-error-message">
                  <p v-if="postContentValidMsg" class="error--text">
                    {{ postContentValidMsg }}
                  </p>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div v-if="bandDetail.isUpload">
              <p class="text-subtitle-2 post-file-attach">첨부 파일</p>
              <v-row v-for="(file, index) in files" :key="index" dense>
                <v-col cols="8">
                  <v-chip small label color="transparent">
                    <v-icon left>mdi-file</v-icon>
                    {{ file.name }}
                  </v-chip>
                </v-col>
                <v-col cols="4">
                  <v-btn icon @click="deleteFile(index)" class="float-right">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-file-input
                label="Files"
                show-size
                multiple
                prepend-icon="mdi-file-multiple"
                @change="updateFiles"
                :error-messages="fileValidMsg"
              >
              </v-file-input>
            </div>
          </div>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">
            취소
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitPost()">
            게시글 작성
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-responsive>
</template>

<style scoped>
.post-body {
  padding: 0 4.5%;
}

.post-file-attach {
  color: darkgray;
}

.editor-error-message {
  padding-top: 1%;
}
</style>
