<template>
  <div class="normal">
    <v-row>
      <v-col>
        <h1 style="text-align: center">일반 회원가입</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="form">
          <v-text-field
            prepend-inner-icon="mdi-email"
            label="아이디"
            v-model="email"
            :rules="emailRules"
            aria-required="true"
          />
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
              type="name"
              v-model="name"
              :rules="nameRules"
              aria-required="true"
          />
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "아이디(이메일)을 입력해주세요.",
      (v) =>
        (v.length >= 3 && v.length <= 100) ||
        "이메일은 3자 이상, 100자 이하로 입력해주세요.",
      (v) =>
        /^[a-zA-Z0-9.!#$%&\\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          v
        ) || "이메일 형식으로 작성해주세요.",
    ],
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
    passwordCheckRules: [
      (v) => !!v || "비밀번호를 재입력해 체크해주세요.",
      (v) => this.password === v || "비밀번호가 일치하지 않습니다.",
    ],
    name: "",
    nameRules: [
      (v) => !!v || "이름을 입력해주세요.",
      (v) =>
        (v.length >= 1 && v.length <= 50) ||
        "이름은 1자 이상, 50자 이하로 작성해주세요.",
    ],
  }),
};
</script>

<style scoped lang="scss">
.normal {
  border-radius: 15px;
  padding: 20px;
  margin: auto;
  width: 600px;
  background: white;
}
</style>
