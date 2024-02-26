<script>
import { Header } from "@/main";

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
    clickDeleteBtn() {
      this.$axios
        .get("/user/api/v1/bands/" + this.$route.params.bandName)
        .then((response) => {
          const bandHeader = Header.X_BAND_NO;
          const headers = {
            [bandHeader]: response.data.bandInfo.bandNo,
          };

          this.$axios
            .delete("/user/api/v1/bands/" + this.$route.params.bandName, {
              headers: headers,
            })
            .then(() => {
              this.clickCloseModal();
              window.location.replace("/my-page/bands");
              alert("그룹 삭제 완료");
            })
            .catch(() => {
              alert("server error!");
            });
        })
        .catch(() => {
          alert("server error!");
        });
    },
  },
};
</script>

<template>
  <v-sheet rounded="lg">
    <v-card class="custom-card-margin">
      <v-card-title>그룹 삭제</v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-card-text>
        <br />
        <h3 class="custom-font-red d-inline">
          그룹을 삭제하면 복구할 수 없습니다. <br /><br />
          {{ this.$route.params.bandName }}
          그룹 삭제
        </h3>
        <h3 class="d-inline">를 원하신다면</h3>
        <h3 class="custom-font-red d-inline">&nbsp;그룹 삭제 버튼</h3>
        <h3 class="d-inline">을 눌러주세요.</h3>
        <br />
        <br />
        <v-btn @click="clickOpenModal" class="error">그룹 삭제</v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="openModal" max-width="500px">
      <v-card>
        <v-card-title>그룹 삭제 확인</v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-card-subtitle class="custom-font-size"
          ><br />정말로 이 그룹을 삭제하시겠습니까?
        </v-card-subtitle>
        <v-card-actions class="justify-end">
          <v-btn color="dark" @click="clickCloseModal">취소</v-btn>
          <v-btn color="error" @click="clickDeleteBtn">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<style scoped>
.custom-card-margin {
  padding: 1em;
}

.custom-font-red {
  color: #e53935;
}

.custom-font-size {
  font-size: 15px;
  font-weight: bold;
  opacity: 1;
}
</style>
