<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Career, FileCategory } from "@/main";
import { Editor } from "@toast-ui/vue-editor";
import axios from "axios";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      locationCodeList: null,
      locationCodeParentsList: [],
      locationCodeChildList: [],

      branchCodeList: null,
      branchCodeParentsList: [],
      branchCodeChildList: [],

      recruitCareerList: [],

      startDateModal: false,
      endDateModal: false,

      selectLocationCodeNo: null,
      selectLocationChildCodeNo: null,
      selectBranchCodeNo: null,
      selectBranchChildCodeNo: null,
      recruitPostName: null,
      recruitCareer: null,
      selected: false,
      startDate: null,
      endDate: null,
      exposurePost: true,

      editorOptions: {
        hideModeSwitch: false,
        toolbarItems: [
          ["heading", "bold", "italic", "strike"],
          ["ul", "ol", "task"],
          ["table", "image", "link"],
        ],
        hooks: {
          addImageBlobHook(blob, callback) {
            const formData = new FormData();
            formData.append("image", blob);

            axios
              .post("/file/api/v1/hook-files", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "X-File-Save-Location": "OBJECT_STORAGE",
                  "X-File-Category": FileCategory.HOOKS,
                },
              })
              .then((result) => {
                callback(result.data.path);
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      },
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    selectLocationCodeNo: {
      handler: function () {
        this.locationCodeChildList = [];
        this.locationCodeList.forEach((code) => {
          if (
            code.locationCodeNo
              .toString()
              .startsWith(
                this.selectLocationCodeNo.toString().substring(0, 5)
              ) &&
            !code.locationCodeNo.toString().endsWith("00")
          ) {
            this.locationCodeChildList.push(code);
          }
        });
      },
    },
    selectBranchCodeNo: {
      handler: function () {
        this.branchCodeChildList = [];
        this.branchCodeList.forEach((code) => {
          if (
            code.branchCodeNo
              .toString()
              .startsWith(this.selectBranchCodeNo.toString().substring(0, 3)) &&
            !code.branchCodeNo.toString().endsWith("00")
          ) {
            this.branchCodeChildList.push(code);
          }
        });
      },
    },
  },
  methods: {
    async fetchData() {
      await this.$axios
        .get("/post/api/v1/location-codes")
        .then((response) => {
          this.locationCodeList = response.data;
        })
        .catch(() => {
          alert("server error!");
        });
      this.locationCodeList.forEach((code) => {
        if (code.locationCodeNo.endsWith("00")) {
          this.locationCodeParentsList.push(code);
        }
      });
      await this.$axios
        .get("/post/api/v1/recruit-branch-codes")
        .then((response) => {
          this.branchCodeList = response.data;
        })
        .catch(() => {
          alert("server error!");
        });
      this.branchCodeList.forEach((code) => {
        if (code.branchCodeNo.endsWith("00")) {
          this.branchCodeParentsList.push(code);
        }
      });
      this.recruitCareerList = Object.keys(Career).map((originKey) => ({
        key: originKey,
        value: Career[originKey],
      }));
    },
    updateStartDate(value) {
      this.startDate = value;
      this.$refs.startDateModal.save(value);
    },
    updateEndDate(value) {
      this.endDate = value;
      this.$refs.endDateModal.save(value);
    },
  },
};
</script>

<template>
  <v-responsive>
    <!-- Vuetify Modal -->
    <v-card class="custom-card-margin">
      <v-card-title>채용공고 등록</v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <v-card-text>
        <v-form>
          <v-row class="align-center">
            <v-col cols="2"><span class="custom-label">공고 제목</span></v-col>
            <v-col>
              <v-text-field
                flat
                color="dark"
                label="title"
                v-model.trim="recruitPostName"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4"
              ><span class="custom-label">공고 시작일</span>
              <v-menu
                ref="startDateModal"
                v-model="startDateModal"
                :close-on-content-click="false"
                :return-value.sync="startDate"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  no-title
                  scrollable
                  :max="endDate"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="error" @click="startDateModal = false"
                    >Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      startDateModal = false;
                      updateStartDate(startDate);
                    "
                    >OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4"
              ><span class="custom-label">공고 마감일</span>
              <v-menu
                ref="endDateModal"
                v-model="endDateModal"
                :close-on-content-click="false"
                :return-value.sync="endDate"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="endDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="error" @click="endDateModal = false"
                    >Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      endDateModal = false;
                      updateEndDate(endDate);
                    "
                    >OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <div class="d-inline d-flex align-center justify-center">
                <span class="custom-label">공고 공개 여부 &nbsp;&nbsp;</span>
                <v-switch color="indigo" v-model="exposurePost"></v-switch>
              </div>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="2"><span class="custom-label">근무지</span></v-col>
            <v-col>
              <v-select
                v-model="selectLocationCodeNo"
                :items="locationCodeParentsList"
                item-text="locationName"
                item-value="locationCodeNo"
                dense
                label="Location"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                clearable
                v-bind:disabled="selectLocationCodeNo == null"
                v-model="selectLocationChildCodeNo"
                :items="locationCodeChildList"
                item-text="locationName"
                item-value="locationCodeNo"
                dense
                label="Sub Location"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="2"><span class="custom-label">채용 직무</span></v-col>
            <v-col>
              <v-select
                v-model="selectBranchCodeNo"
                :items="branchCodeParentsList"
                item-text="branchName"
                item-value="branchCodeNo"
                dense
                label="Branch"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                clearable
                v-model="selectBranchChildCodeNo"
                v-bind:disabled="selectBranchCodeNo == null"
                :items="branchCodeChildList"
                item-text="branchName"
                item-value="branchCodeNo"
                dense
                label="Sub Branch"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="2"><span class="custom-label">필요 경력</span></v-col>
            <v-col cols="4">
              <v-select
                v-model="recruitCareer"
                :items="recruitCareerList"
                item-text="value"
                item-value="key"
                label="career"
                dense
              ></v-select>
            </v-col>
            <v-col cols="1"><span class="custom-label">연봉</span></v-col>
            <v-col cols="2">
              <v-text-field :disabled="selected"></v-text-field>
            </v-col>
            <v-col cols="3">
              <span class="custom-label">만원 &nbsp;</span>
              <span>( 회사 내규에 따름</span>
              <v-checkbox class="d-inline-flex" v-model="selected"></v-checkbox>
              <span>)</span>
            </v-col>
          </v-row>
          <v-row></v-row>
          <span class="custom-label">공고 내용</span>
          <br /><br />
          <Editor
            class="mx-1"
            ref="tuiEditor"
            :options="editorOptions"
            height="500px"
            initialEditType="wysiwyg"
            previewStyle="vertical"
          ></Editor>
        </v-form>
        <br />
      </v-card-text>
    </v-card>
  </v-responsive>
</template>

<style scoped>
.custom-label {
  font-size: 16px;
  font-weight: bold;
  color: black;
}

.custom-card-margin {
  padding: 1em;
}
</style>
