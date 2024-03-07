<script>
export default {
  data() {
    return {
      openModal: false,
    };
  },
  methods: {
    clickOpenModal() {
      this.openModal = true;
    },
    clickCloseModal() {
      this.openModal = false;
    },
    clickLeaveBtn() {
      this.$axios
        .delete("/user/api/v1/bands/" + this.$route.params.bandName)
        .then(() => {
          this.clickCloseModal();
          window.location.replace("/my-page/bands");
          alert("그룹 삭제 완료");
        })
        .catch(() => {
          this.clickCloseModal();
          alert("탈퇴 실패");
        });
    },
  },
};
</script>

<template>
  <v-sheet rounded="lg">
    <v-card class="custom-card-margin">
      <v-card-title>그룹 탈퇴</v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-card-text>
        <br />
        <h3 class="custom-font-red">
          그룹을 탈퇴해도, 그룹 내에 작성했던 게시글과 댓글은 자동으로 삭제되지
          않습니다.
          <br />재가입 시에도 기존에 작성했던 게시글과 댓글은 삭제할 수
          없습니다.
        </h3>
        <br />

        <h3 class="d-inline">{{ this.$route.params.bandName }} 그룹 탈퇴</h3>

        <h3 class="d-inline">를 원하신다면</h3>
        <h3 class="custom-font-red d-inline">&nbsp;그룹 탈퇴 버튼</h3>
        <h3 class="d-inline">을 눌러주세요.</h3>
        <h4 class="custom-font-red">
          (그룹의 CREATOR인 경우, 해당 권한을 위임한 후 그룹을 탈퇴할 수
          있습니다.)
        </h4>
        <br />
        <br />
        <v-btn @click="clickOpenModal" class="error">그룹 탈퇴</v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="openModal" max-width="500px">
      <v-card>
        <v-card-title>그룹 탈퇴 확인</v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-card-subtitle class="custom-font-size"
          ><br />정말로 이 그룹을 탈퇴하시겠습니까?
        </v-card-subtitle>
        <v-card-actions class="justify-end">
          <v-btn color="dark" @click="clickCloseModal">취소</v-btn>
          <v-btn color="error" @click="clickLeaveBtn">탈퇴</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<style scoped>
.custom-font-red {
  color: #e53935;
}

.custom-card-margin {
  padding: 1em;
}
</style>
