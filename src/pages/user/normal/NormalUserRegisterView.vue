<template>
  <div class="normal">
    <v-row>
      <v-col>
        <h1 style="text-align: center; margin-top: 20px; margin-bottom: 5px">
          일반 회원가입
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
                ></v-text-field>
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
                  "
                  :disabled="emailSuccess"
                  >이메일 인증</v-btn
                >
              </v-col>
            </v-row>
            <auth-number-check
              v-if="authNumberCheck"
              v-on:successEvent="emailCheckSuccess"
              :disabled="emailSuccess"
            />
          </div>
          <v-text-field
            prepend-inner-icon="mdi-lock"
            label="비밀번호"
            type="password"
            v-model="password"
            :rules="passwordRules"
            aria-required="true"
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
            label="이름"
            v-model="name"
            :rules="nameRules"
            aria-required="true"
          />
          <v-text-field
            prepend-inner-icon="mdi-phone"
            label="연락처"
            v-model="phoneNo"
            :rules="phoneNoRules"
            aria-required="true"
          />
          <v-text-field
            prepend-inner-icon="mdi-cake"
            label="생일"
            type="date"
            v-model="birth"
            :rules="birthRules"
            aria-required="true"
          />
          <p style="text-align: center">구직여부</p>
          <v-radio-group aria-required="true" v-model="wantJobTypeNo">
            <v-radio label="구직중이에요!" :value="1" />
            <v-radio label="이직제안 받아볼래요." :value="2" />
            <v-radio label="관심 없어요." :value="3" />
          </v-radio-group>
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
    phoneNo: "",
    phoneNoRules: [
      (v) => !!v || "연락처를 입력해주세요.",
      (v) =>
        (v.length >= 9 && v.length <= 11) ||
        "연락처는 9자 이상, 11자 이하로 작성해주세요.",
      (v) => /^[0-9]/.test(v) || "-를 뺀 전화번호를 적어주세요.",
    ],
    birth: "",
    birthRules: [(v) => !!v || "생일을 입력해주세요."],
    wantJobTypeNo: 1,
  }),
  methods: {
    emailCheck() {
      this.$axios
        .get("/user/api/v1/email-check?email=" + this.email)
        .then(() => {
          this.authNumberCheck = true;
        })
        .catch(() => {
          alert("인증번호 발신 실패했습니다. 다시 요청해주세요.");
        });
    },
    emailCheckSuccess() {
      this.emailSuccess = true;
    },
    signup() {
      if (!this.$refs.form.validate()) {
        alert("형식에 맞춰 작성해주십시오.");
        return;
      }
      if (this.password !== this.passwordCheck) {
        alert("비밀번호가 일치하지 않습니다. 다시 작성해주십시오.");
        this.password = "";
        this.passwordCheck = "";
        return;
      }
      const params = {
        id: this.email,
        password: this.password,
        name: this.name,
        wantJobTypeNo: this.wantJobTypeNo,
        phoneNo: this.phoneNo,
        birth: this.birth.replaceAll("-", ""),
      };
      this.$axios
        .post("/user/api/v1/normals", JSON.stringify(params), {
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
</style>
