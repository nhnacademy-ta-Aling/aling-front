<template>
  <div class="normal">
    <v-row>
      <v-col>
        <h1 style="text-align: center; margin-top: 20px; margin-bottom: 5px">
          회원가입
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="form" @submit.prevent="signup">
          <div>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-email"
                  label="아이디"
                  v-model="email"
                  :rules="emailRules"
                  aria-required="true"
                  :disabled="emailSuccess"
                >
                </v-text-field>
              </v-col>
              <v-col
                cols="auto"
                style="margin-top: 25px; margin-right: 12px; padding: 0"
              >
                <v-btn
                  depressed
                  @click="emailCheck"
                  style="
                    background: white;
                    color: #3d6bff;
                    border-color: #3d6bff;
                    border-style: solid;
                    width: 7em;
                    height: 2.5em;
                  "
                  :disabled="emailSuccess"
                  >이메일 인증
                </v-btn>
              </v-col>
            </v-row>
            <auth-number-check
              v-if="authNumberCheck"
              v-on:successEvent="emailCheckSuccess"
              v-bind:email="email"
            />
          </div>
          <v-text-field
            prepend-inner-icon="mdi-lock"
            label="비밀번호"
            type="password"
            v-model="password"
            :rules="passwordRules"
            aria-required="true"
            :maxLength="20"
          />
          <v-text-field
            prepend-inner-icon="mdi-lock-check"
            label="비밀번호 재입력"
            type="password"
            v-model="passwordCheck"
            :rules="passwordCheckRules"
            aria-required="true"
          />
          <v-text-field
            prepend-inner-icon="mdi-account"
            label="법인명"
            v-model="companyName"
            :rules="companyNameRules"
            aria-required="true"
            :maxLength="50"
          />
          <v-text-field
            prepend-inner-icon="mdi-format-list-bulleted"
            label="업종"
            v-model="sector"
            :rules="sectorRules"
            aria-required="true"
            :maxLength="50"
          />
          <v-select
            prepend-inner-icon="mdi-home-modern"
            v-model="selectedCompanySize"
            :rules="companySizeRules"
            label="기업규모"
            :items="companySizes"
            item-text="name"
            item-value="value"
          ></v-select>
          <v-text-field
            prepend-inner-icon="mdi-clipboard-account"
            label="대표자명"
            v-model="name"
            :rules="nameRules"
            aria-required="true"
          />
          <v-text-field
            prepend-inner-icon="mdi-calendar"
            label="개업연월일"
            v-model="openDate"
            :rules="openDateRules"
            aria-required="true"
            :maxLength="10"
            placeholder="YYYY/MM/dd"
            oninput="javascript: this.value = this.value.replace(/[^0-9]/, '').replace(/^(\d{4})(\d{2})(\d{2})$/, `$1/$2/$3`);"
          />
          <div>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-account"
                  label="사업자등록번호"
                  v-model="companyNum"
                  :rules="companyNumRules"
                  aria-required="true"
                  oninput="javascript: this.value = this.value.replace(/[^0-9]/, '').replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);"
                  id="companyNum"
                  :maxLength="12"
                  :readonly="companyNumIsReadOnly"
                />
              </v-col>
              <v-col
                cols="auto"
                style="margin-top: 25px; margin-right: 12px; padding: 0"
              >
                <v-btn
                  depressed
                  style="
                    background: white;
                    color: #3d6bff;
                    border-color: #3d6bff;
                    border-style: solid;
                    width: 7em;
                    height: 2.5em;
                  "
                  type="button"
                  @click="companyNumCheck"
                >
                  사업자 인증
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-map-marker"
                  type="text"
                  placeholder="우편 번호"
                  v-model="zoneCode"
                  readonly
                />
              </v-col>
              <v-col cols="auto" class="search-button-col">
                <v-btn
                  depressed
                  style="
                    background: white;
                    color: #3d6bff;
                    border-color: #3d6bff;
                    border-style: solid;
                    width: 7em;
                    height: 2.5em;
                  "
                  @click="openPostCode"
                  >주소 검색</v-btn
                >
              </v-col>
            </v-row>
            <v-text-field
              prepend-inner-icon="mdi-home"
              type="text"
              v-model="roadAddress"
              placeholder="소재지 주소"
              readonly
            />
            <v-text-field
              prepend-inner-icon="mdi-details"
              type="text"
              v-model="detailAddress"
              placeholder="상세 주소"
              :maxLength="100"
            />
          </div>
          <input id="address" style="width: 35em" :value="inputAddress" />
          <v-btn
            depressed
            width="100%"
            style="background: #3d6bff; color: white"
            type="submit"
          >
            회원가입
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuthNumberCheck from "@/components/user/AuthNumberCheck.vue";

export default {
  components: { AuthNumberCheck },
  data: () => ({
    authNumberCheck: false,
    isValidEmail: false,
    email: "",
    emailRules: [
      (v) => !!v || "아이디(이메일)을 입력해주세요.",
      (v) =>
        (v.length >= 3 && v.length <= 100) ||
        "이메일은 3자 이상, 100자 이하로 입력해주세요.",
      (v) =>
        /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/.test(
          v
        ) || "이메일 형식으로 작성해주세요.",
    ],
    emailSuccess: false,
    password: "",
    passwordRules: [
      (v) => !!v || "비밀번호를 입력해주세요.",
      (v) =>
        (v.length >= 8 && v.length <= 20) ||
        "비밀번호는 8자 이상, 20자 이하로 작성해주세요.",
      (v) => /(?=.*\d)/.test(v) || "숫자를 포함해야 합니다.",
      (v) =>
        /([~!@#$%^&*_+-])/.test(v) ||
        "특수문자(~!@#$%^&*_+-)를 포함해야 합니다.",
      (v) => /([a-z])/.test(v) || "소문자를 포함해야 합니다.",
      (v) => /([A-Z])/.test(v) || "대문자를 포함해야 합니다.",
    ],
    passwordCheck: "",
    passwordCheckRules: [(v) => !!v || "비밀번호를 재입력해 체크해주세요."],
    name: "",
    nameRules: [
      (v) => !!v || "이름을 입력해주세요.",
      (v) =>
        (v.length >= 1 && v.length <= 50) ||
        "이름은 1자 이상, 50자 이하로 작성해주세요.",
    ],
    address: "",
    addressRules: [
      (v) => !!v || "소재지를 입력해주세요.",
      (v) => (v.length >= 1 && v.length <= 11) || "소재지를 입력해주세요.",
    ],
    companyNum: "",
    companyNumRules: [
      (v) =>
        v.replaceAll("-", "").length === 10 || "사업자등록번호를 입력해주세요.",
      (v) => /([0-1])/.test(v.replaceAll("-", "")) || "숫자만 입력해주세요.",
    ],
    companyNumSuccess: false,
    companyNumIsReadOnly: false,
    companyName: "",
    companyNameRules: [(v) => !!v || "법인명을 입력해주세요."],
    openDate: "",
    openDateRules: [
      (v) => /([-1])/.test(v.replaceAll("/", "")) || "숫자만 입력해주세요.",
    ],
    zoneCode: "",
    roadAddress: "",
    detailAddress: "",
    inputAddress: "",
    isValidCompany: false,
    companySizes: [
      { name: "대기업", value: "CORPORATE" },
      { name: "중견기업", value: "MEDIUM" },
      { name: "중소기업", value: "SMALL" },
    ],
    selectedCompanySize: "",
    companySizeRules: [(v) => !!v || "기업규모를 선택해주세요."],
    sector: "",
    sectorRules: [(v) => !!v || "업종을 입력해주세요."],
  }),
  watch: {
    roadAddress: function () {
      this.inputAddress = this.roadAddress + " " + this.detailAddress;
    },
    detailAddress: function () {
      this.inputAddress = this.roadAddress + " " + this.detailAddress;
    },
  },
  methods: {
    emailCheck() {
      this.$axios
        .get("/user/api/v1/email-check?email=" + this.email)
        .then(() => {
          this.authNumberCheck = true;
          alert("인증번호가 발신되었습니다. 인증번호는 3분 뒤 만료됩니다.");
        })
        .catch(() => {
          alert("인증번호 발신 실패했습니다. 다시 요청해주세요.");
        });
    },
    emailCheckSuccess() {
      this.emailSuccess = true;
      this.authNumberCheck = false;
      this.isValidEmail = true;
    },
    companyNumCheck() {
      this.$axios
        .post(
          "https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=liNNj0YnlMNxNgM9l1LrvzETHB4WlYmPAsxiMA1sJ%2FFR8o318n6DqQfRwBwYazZ8hxtLvNJZo%2BtQlhcGb%2BDylQ%3D%3D",
          {
            businesses: [
              {
                b_no: this.companyNum.replaceAll("-", ""),
                start_dt: this.openDate.replaceAll("/", ""),
                p_nm: this.name,
              },
            ],
          },
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.data[0].valid === "01") {
            this.companyNumIsReadOnly = true;
            this.isValidCompany = true;
            alert("인증되었습니다.");
          } else {
            alert("인증에 실패하였습니다.");
          }
        })
        .catch(() => {
          alert("인증에 실패하였습니다.");
        });
    },
    openPostCode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.zoneCode = data.zonecode;
          this.roadAddress = data.roadAddress;
        },
      }).open();
    },
    signup() {
      if (!this.$refs.form.validate()) {
        alert("형식에 맞춰 작성해주십시오.");
        return;
      }
      if (!this.isValidEmail) {
        alert("이메일 인증을 진행해주세요.");
        return;
      }
      if (this.password !== this.passwordCheck) {
        alert("비밀번호가 일치하지 않습니다. 다시 작성해주십시오.");
        this.password = "";
        this.passwordCheck = "";
        return;
      }
      if (!this.isValidCompany) {
        alert("기업 인증을 진행해주세요.");
        return;
      }
      const params = {
        email: this.email,
        password: this.password,
        name: this.companyName,
        address: this.inputAddress,
        companyRegistrationNo: this.companyNum.replaceAll("-", ""),
        companySize: this.selectedCompanySize,
        companySector: this.sector,
      };
      this.$axios
        .post("/user/api/v1/companies", JSON.stringify(params), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          window.location = "/";
        })
        .catch(() => {
          alert("회원가입 실패");
        });
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.normal {
  border-radius: 15px;
  padding: 25px;
  margin: auto;
  width: auto;
  max-width: 600px;
  background: white;
}

.company-num-col {
  margin-top: 25px;
  margin-left: 12px;
  padding: 0;
}

.search-button-col {
  margin-top: 25px;
  margin-right: 12px;
  padding: 0;
}
</style>
