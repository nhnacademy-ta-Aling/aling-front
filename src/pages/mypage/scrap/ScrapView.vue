<template>
  <div>
    <custom-my-page-header />
    <v-card min-width="400px">
      <v-row>
        <v-col cols="12">
          <h1 style="text-align: center; padding-top: 15px">내 스크랩</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <table>
            <thead>
              <tr>
                <th style="text-align: center; width: 10%">번호</th>
                <th style="text-align: center">게시물</th>
                <th style="text-align: center; width: 90px">스크랩 취소</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="scrap of scraps"
                :key="scrap"
                v-show="!scrap.isDelete && scrap.isOpen"
              >
                <td style="text-align: center">{{ scrap.postNo }}</td>
                <td style="text-align: left; padding-left: 20px">
                  <a
                    style="color: black; text-decoration-line: none"
                    :href="`/articles/${scrap.postNo}`"
                  >
                    {{ scrap.content }}
                  </a>
                </td>
                <td style="text-align: center">
                  <v-btn
                    depressed
                    style="background-color: white"
                    @click="scrapCancel(scrap.postNo)"
                    >취소</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <custom-pagination
            class="text-center"
            :currentPage="this.pageNumber"
            :totalPage="this.totalPages"
            @clickPageBtn="updatePage"
          ></custom-pagination>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import CustomMyPageHeader from "@/pages/mypage/header/CustomMyPageHeader.vue";
import CustomPagination from "@/components/commons/CustomPagination.vue";
import VueCookie from "vue-cookie";
import Vue from "vue";

Vue.use(VueCookie);

export default {
  components: { CustomPagination, CustomMyPageHeader },
  data() {
    return {
      sizeNumber: this.$route.query.size || 5,
      pageNumber: this.$route.query.page || 0,
      totalPages: 0,
      totalElements: 0,
      scraps: [],
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.fetchData();
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;

      this.$axios
        .get(
          "/user/api/v1/post-scraps/posts?page=" +
            this.pageNumber +
            "&size=" +
            this.sizeNumber
        )
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.scraps = response.data.content;
          this.pageNumber = response.data.pageNumber;
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
        })
        .catch((response) => {
          alert("server error! - " + response);
        });
    },
    updatePage(pageNum) {
      window.location.href =
        "/my-page/scraps?size=" + this.sizeNumber + "&page=" + pageNum;
    },
    scrapCancel(postNo) {
      this.$axios
        .post("/user/api/v1/post-scraps/" + postNo, {})
        .then((response) => {
          console.log(response);

          window.location.reload();
        })
        .catch((response) => {
          alert("server error! - " + response);
        });
    },
  },
};
</script>

<style scoped>
body {
  padding: 1.5em;
  background: #f5f5f5;
}

table {
  border: 1px #3d6bff solid;
  font-size: 0.9em;
  width: 95%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
  margin: auto;
}

thead {
  font-weight: bold;
  color: #3d6bff;
  border-top: 2.5px solid #3d6bff;
  border-bottom: 2px solid #3d6bff;
}

td,
th {
  padding: 1em 0.5em;
  vertical-align: middle;
  border: 1px solid lightgray;
}

tr,
td {
  padding: 0.5em;
  border: 1px solid lightgray;
}

a {
  color: #3d6bff;
}
</style>
