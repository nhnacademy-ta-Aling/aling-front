<script>
export default {
  components: {},
  data: () => ({
    email: document.cookie.match("exuser=(.*)")
      ? document.cookie.match("exuser=(.*)")[1]
      : "",
    emailRules: [(v) => !!v || ""],
    pwd: "",
    pwdRules: [(v) => !!v || ""],
    isEmailSave: document.cookie.match("exuser=(.*)")[1] !== "",
  }),
  methods: {
    login() {
      const params = {
        email: this.email,
        password: this.pwd,
      };
      if (this.isEmailSave === true) {
        document.cookie = "exuser=" + this.email + "; path=/login";
      } else {
        document.cookie = "exuser= ; path=/login";
      }
      this.$axios
        .post("/user/api/v1/login", JSON.stringify(params), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          window.location = "/";
        })
        .catch(() => {
          this.pwd = "";
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        });
    },
  },
};
</script>

<template>
  <v-main class="grey lighten-3" justify="center">
    <v-container fill-height>
      <v-responsive>
        <v-row class="login-container" align="center">
          <v-col class="hidden-sm-and-down" ml-6>
            <v-layout>
              <v-img src="@/assets/logo.svg" class="img-logo" alt="logo" />
            </v-layout>
          </v-col>
          <v-col ml-6 sm-12 align-self="center">
            <v-form ref="form" @submit.prevent="login" ml-6 sm-12>
              <v-checkbox
                label="아이디 저장"
                v-model="isEmailSave"
              ></v-checkbox>
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
              <v-card flat>
                <v-card-text>
                  <router-link to="#">아이디</router-link>&nbsp;/
                  <router-link to="#">비밀번호 찾기</router-link>
                </v-card-text>
                <v-card-text style="margin-top: -2em">
                  <p class="social-login-text">소셜로 시작하기</p>
                  <v-row justify="space-around">
                    <v-col cols="auto">
                      <router-link to="#">
                        <v-img
                          src="/oauthicons/kakao-icon.png"
                          alt="kakao"
                          class="oauth-icon"
                        />
                      </router-link>
                    </v-col>
                    <v-col cols="auto">
                      <a
                        href="https://accounts.google.com/o/oauth2/v2/auth?client_id=459224556708-qcr0lse1o89p4a63opeja3k3ibcs1i68.apps.googleusercontent.com&redirect_uri=http://localhost:8080/oauth/google&response_type=code&scope=email"
                      >
                        <v-img
                          src="/oauthicons/google-icon.png"
                          alt="google"
                          class="oauth-icon"
                        />
                      </a>
                    </v-col>
                    <v-col cols="auto">
                      <a
                        href="https://github.com/login/oauth/authorize?client_id=Iv1.60b50ca131c586d7&scope=id,name,email"
                      >
                        <v-img
                          src="/oauthicons/github-icon.png"
                          alt="github"
                          class="oauth-icon"
                        />
                      </a>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
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
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<style scoped>
.login-container {
  border-radius: 15px;
  padding: 1.7em;
  margin: auto;
  width: auto;
  max-width: 80em;
  background-color: white;
}
.img-logo {
  object-fit: fill;
  max-width: 25em;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3em;
}
.social-login-text {
  text-align: center;
  font-size: 1em;
  color: #5c667b;
  line-height: 24px;
  letter-spacing: -1px;
}

.social-login-text:after {
  width: 5em;
  height: 1px;
  background-color: #eaedf4;
  display: inline-block;
  vertical-align: super;
  content: "";
}

.social-login-text:before {
  width: 5em;
  height: 1px;
  background-color: #eaedf4;
  display: inline-block;
  vertical-align: super;
  content: "";
}

.oauth-icon {
  width: 3em;
  height: 3em;
}
</style>
