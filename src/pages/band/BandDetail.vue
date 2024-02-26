<script>
import BandUserListModal from "@/pages/band/BandUserListModal.vue";
import BandPostModal from "@/pages/band/BandPostModal.vue";

export default {
  components: {
    BandPostModal,
    BandUserListModal,
  },
  data() {
    return {
      loading: false,
      bandDetail: null,
      bandUserInfo: null,
      error: null,
      infoMore: false,
      infoIsLong: false,
      memberModal: false,
    };
  },
  watch: {
    $route: "fetchData",
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.bandDetail = null;
      this.loading = true;
      this.$axios
        .get("/user/api/v1/bands/" + this.$route.params.bandName)
        .then((response) => {
          this.loading = false;
          this.bandDetail = response.data.bandInfo;
          this.bandUserInfo = response.data.bandUserInfo;
        })
        .catch((error) => {
          this.error = error.toString();
        });
    },
    openBandMemberModal() {
      this.memberModal = true;
    },
    clickInfoMore() {
      this.infoMore = true;
    },
    clickInfoLess() {
      this.infoMore = false;
    },
  },
  computed: {
    viewBandInfo() {
      return function (bandInfo) {
        this.infoIsLong =
          bandInfo.substring(0, window.innerWidth / 25).length <
          bandInfo.length;
        if (this.infoIsLong)
          return bandInfo.substring(0, window.innerWidth / 25) + " ...";
        else return bandInfo;
      };
    },
  },
};

//this.$route.params
</script>

<template>
  <v-sheet color="" min-height="70vh" rounded="lg">
    <!--그룹 상세 정보-->
    <div v-if="bandDetail">
      <v-card class="post-card">
        <v-row>
          <v-col cols="2" class="more-dense">
            <v-img
              class="image-container"
              alt="no image"
              min-width="50px"
              src="../../assets/band-no-image.png"
            ></v-img>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="8" class="more-dense">
                <v-card-title class="more-dense">
                  {{ bandDetail.name }}
                </v-card-title>
              </v-col>
              <v-col cols="4">
                <v-btn
                  @click="openBandMemberModal"
                  class="custom-banduser-btn more-dense"
                  >멤버 목록
                </v-btn>
                <band-user-list-modal
                  :value="memberModal"
                  :bandName="bandDetail.name"
                  @input="memberModal = $event"
                ></band-user-list-modal>
              </v-col>
            </v-row>
            <v-card-subtitle class="blurry-font more-dense">
              <p class="custom-inline">즉시 가입 여부</p>
              <p class="custom-inline" v-if="bandDetail.isEnter">O</p>
              <p class="custom-inline" v-else>X</p>
              <p class="custom-inline">게시글 공개 여부</p>
              <p class="custom-inline" v-if="bandDetail.isViewContent">O</p>
              <p class="custom-inline" v-else>X</p>
            </v-card-subtitle>
            <v-card-subtitle class="custom-bandInfo-subtitle">
              <v-row>
                <v-col cols="10">
                  <div v-if="!infoMore">
                    {{ viewBandInfo(bandDetail.info) }}
                  </div>
                  <div v-else>
                    {{ bandDetail.info }}
                  </div>
                </v-col>
                <v-col cols="2" class="text-right">
                  <span
                    v-if="infoIsLong && !infoMore"
                    @click="clickInfoMore"
                    class="material-symbols-outlined"
                  >
                    expand_more
                  </span>
                  <span
                    v-if="infoIsLong && infoMore"
                    @click="clickInfoLess"
                    class="material-symbols-outlined"
                  >
                    expand_less
                  </span>
                </v-col>
              </v-row>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <!--    그룹 게시물 리스트-->

    <v-card class="band-post-input">
      <v-card-text>
        <v-row>
          <v-col cols="1" class="band-post-icon">
            <v-icon large color="light-blue darken-2">present_to_all</v-icon>
          </v-col>
          <v-col cols="11" class="band-post-btn">
            <band-post-modal :bandDetail="bandDetail"></band-post-modal>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.image-container {
  border-radius: 10px;
  border: 2px solid grey;
  top: 0.7em;
  margin-left: 45%;
  display: flex;
  align-items: center;
}

.custom-bandInfo-subtitle {
  background-color: #f0f0f0;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 1em;
  margin-left: 1em;
  margin-right: 1em;
}

.text-right {
  text-align: right;
}

.blurry-font {
  font-size: 13px;
  opacity: 0.5;
}

.custom-inline {
  margin-right: 2%;
  display: inline-block;
}

.custom-banduser-btn {
  float: right;
  margin-right: 1.5em;
  margin-top: 1em;
}

.more-dense {
  margin-bottom: 0.1em;
  padding-bottom: 0.1em;
}

.band-post-input {
  margin: 5% 3% 3%;
}

.band-post-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.band-post-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
