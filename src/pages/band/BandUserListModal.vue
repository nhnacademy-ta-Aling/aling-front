<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    bandName: {
      type: String,
      require: true,
    },
  },
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      page: 0,
      size: 20,
      memberList: [],
      allMemberCount: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios
        .get(
          "/user/api/v1/bands/" +
            this.bandName +
            "/users?page=" +
            this.page +
            "&size=" +
            this.size
        )
        .then((response) => {
          this.allMemberCount = response.data.totalElements;
          this.memberList = response.data.content;
          this.page += 1;
        })
        .catch(() => {
          alert("server error");
        });
    },
    infiniteHandler($state) {
      this.$axios
        .get(
          "/user/api/v1/bands/" +
            this.bandName +
            "/users?page=" +
            this.page +
            "&size=" +
            this.size
        )
        .then((response) => {
          setTimeout(() => {
            {
              if (response.data.content.length) {
                this.memberList = this.memberList.concat(response.data.content);
                $state.loaded();
                this.page += 1;
                if (response.data.content.length < this.size) {
                  $state.complete();
                }
              } else {
                $state.complete();
              }
            }
          }, 500);
        })
        .catch(() => {
          alert("server error");
        });
    },
    closeBandMemberModal() {
      this.memberModal = false;
    },
  },
  computed: {
    memberModal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<template>
  <v-responsive max-height="300px">
    <v-dialog
      :value="memberModal"
      @input="memberModal = $event"
      max-width="300"
    >
      <v-card class="non-scroll" min-height="500px">
        <v-row>
          <v-col cols="8">
            <v-card-title>멤버 목록</v-card-title>
          </v-col>
          <v-col cols="4">
            <p class="member-count-style">({{ this.allMemberCount }}명)</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-card-text>
          <div class="scroll-style">
            <!-- 테스트 데이터-->
            <v-row>
              <v-col cols="3" class="more-dense">
                <v-img
                  class="image-container"
                  alt="no image"
                  max-width="33px"
                  src="../../assets/user-no-image.png"
                ></v-img>
              </v-col>
              <v-col cols="9" class="custom-member-name">
                유저 이름 누르면 유저페이지로 (추후)
              </v-col>
            </v-row>
            <!-- 테스트 데이터 끝-->
            <v-row
              v-for="bandMember in memberList"
              :key="bandMember.userInfo.userNo"
            >
              <v-col cols="3" class="float-left more-dense">
                <v-img
                  class="image-container"
                  alt="no image"
                  min-width="33px"
                  max-width="33px"
                  src="../../assets/user-no-image.png"
                ></v-img>
              </v-col>
              <v-col cols="9" class="custom-member-name">
                {{ bandMember.userInfo.name }}
              </v-col>
            </v-row>
            <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
              <div slot="no-more"></div>
              <div slot="no-results"></div>
            </infinite-loading>
          </div>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn @click="closeBandMemberModal">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-responsive>
</template>

<style scoped>
.image-container {
  border-radius: 10px;
  border: 1px solid grey;
  top: 0.7em;
  display: flex;
  align-items: center;
}

.custom-member-name {
  color: #2c2c2c;
  margin-bottom: 0.1em;
  padding-bottom: 0.1em;
  margin-top: 1.1em;
  padding-top: 0.4em;
  display: flex;
  align-items: center;
}

.more-dense {
  margin-bottom: 0.1em;
  padding-bottom: 0.1em;
  margin-top: 0.5em;
  padding-top: 0.1em;
}

.scroll-style {
  height: 30em;
  overflow-y: auto;
  overflow-x: hidden;
}

.member-count-style {
  margin-top: 1.5em;
  color: #888888;
  font-size: 15px;
}

.non-scroll {
  overflow-x: hidden;
}
</style>
