<script>
export default {
  data: () => ({
    model: "tab",
  }),
};
</script>

<template>
  <div class="normal">
    <v-row align="center" justify="center">
      <v-tabs centered v-model="model" align-tabs="center">
        <v-tab><p>개인</p></v-tab>
        <v-tab to="/signup/company">
          <p>기업</p>
        </v-tab>
      </v-tabs>

      <v-window v-model="model">
        <v-window-item>
          <v-card flat>
            <v-card-title>소셜로 가입하기</v-card-title>
            <v-card-text>
              <li>카카오</li>
              <li>구글</li>
              <li>...</li>
            </v-card-text>
          </v-card>
          <v-card>
            <v-divider style="margin-top: 1em; margin-bottom: 1em"></v-divider>
            <router-link to="/signup/normal">
              <v-btn
                style="
                  background: white;
                  color: #3d6bff;
                  border-color: #3d6bff;
                  border-style: solid;
                "
              >
                Aling 계정 만들기
              </v-btn>
            </router-link>
          </v-card>
        </v-window-item>
        <v-window-item></v-window-item>
      </v-window>
    </v-row>
  </div>
</template>

<style scoped>
.normal {
  border-radius: 15px;
  padding: 25px;
  margin: auto;
  width: auto;
  max-width: 600px;
  background: white;
}
p {
  margin-top: 2em;
  font-size: 15px;
}
</style>
