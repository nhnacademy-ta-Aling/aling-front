<template>
  <div>
    <v-row>
      <v-col style="padding-top: 0">
        <v-text-field
          label="인증번호를 입력해주세요."
          v-model="authNumber"
        ></v-text-field>
      </v-col>
      <v-col
        cols="auto"
        style="margin-top: 14px; margin-right: 12px; padding: 0"
      >
        <v-btn
          depressed
          @click="authNumberChecking"
          style="
            background: white;
            color: #3d6bff;
            border-color: #3d6bff;
            border-style: solid;
          "
          >인증번호 확인</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["email"],
  data: () => ({
    authNumber: "",
  }),
  methods: {
    authNumberChecking() {
      const params = {
        email: this.email,
        authNumber: this.authNumber,
      };
      this.$axios
        .post("/user/api/v1/email-check", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.$emit("successEvent");
          alert("이메일 인증되었습니다.");
        })
        .catch(() => {
          window.location.reload();
          alert("인증에 실패하였습니다.");
        });
    },
  },
};
</script>
