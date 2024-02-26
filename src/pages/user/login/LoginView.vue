<script>
import LoginHeader from "@/components/index/LoginHeader.vue";

export default {
  components: { LoginHeader },
  data: () => ({
    email: document.cookie.match("exuser=(.*)")
      ? document.cookie.match("exuser=(.*)")[1]
      : "",
    emailRules: [(v) => !!v || ""],
    pwd: "",
    pwdRules: [(v) => !!v || ""],
    isEmailSave: document.cookie.match("exuser=(.*)") !== null,
  }),
  methods: {
    login() {
      const params = {
        email: this.email,
        password: this.pwd,
      };
      if (this.isEmailSave === true) {
        document.cookie = "exuser=" + this.email + ";path=/login";
      }
      this.$axios
        .post("/login", JSON.stringify(params), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          window.location = "/";
        })
        .catch(() => alert("로그인 실패"));
    },
  },
};
</script>

<template>
  <div>
    <login-header></login-header>
    <v-main class="grey lighten-3">
      <v-container>
        <v-responsive>
          <v-form ref="form" @submit.prevent="login" class="login-container">
            <v-layout align-center="center">
              <v-img
                :width="200"
                src="@/assets/logo.svg"
                class="img-logo"
                alt="logo"
              />
            </v-layout>
            <v-checkbox label="아이디 저장" v-model="isEmailSave"></v-checkbox>
            <v-text-field
              prepend-inner-icon="mdi-email"
              outlined
              v-model="email"
              :rules="emailRules"
              aria-required="true"
              label="아이디"
              style="margin-top: -1em"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              outlined
              v-model="pwd"
              :rules="pwdRules"
              aria-required="true"
              type="password"
              label="비밀번호"
              style="margin-top: -1em"
            ></v-text-field>
            <v-btn
              type="submit"
              depressed
              style="
                background: white;
                color: #3d6bff;
                border-color: #3d6bff;
                border-style: solid;
                width: 100%;
                height: 3em;
                margin-top: -0.5em;
              "
              >로그인</v-btn
            >
            <v-divider style="color: #666666; margin-top: 1em"></v-divider>
            <v-card flat>
              <v-card-text>
                <p>소셜로 시작하기</p>
                <li>카카오</li>
                <li>구글</li>
                <li>...</li>
              </v-card-text>
            </v-card>
            <v-divider style="color: #666666"></v-divider>
            <router-link to="/signup">
              <v-btn
                depressed
                style="
                  background: white;
                  color: #3d6bff;
                  border-color: #3d6bff;
                  border-style: solid;
                  width: 100%;
                  height: 3em;
                  margin-top: 1em;
                "
                >회원가입
              </v-btn></router-link
            >
          </v-form>
        </v-responsive>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
.login-container {
  border-radius: 15px;
  padding: 1.7em;
  margin: auto;
  width: auto;
  max-width: 25em;
  background-color: white;
}

.img-logo {
  object-fit: fill;
}
</style>
