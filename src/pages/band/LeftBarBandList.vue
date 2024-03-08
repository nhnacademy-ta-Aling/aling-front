<script>
export default {
  data() {
    return {
      leftBarLoading: false,
      myBandList: [],
      myBandImageMap: new Map(),
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.$axios
        .get("/user/api/v1/users/my-bands", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("access_token"),
            // FIXME 유저 식별 정보 넘어갈 수 있도록 수정
            "X-TEMP-USER-NO": 117,
          },
        })
        .then((response) => {
          this.myBandList = response.data;
        })
        .catch(() => {
          alert("left var server error");
        });

      for (const myBand of this.myBandList) {
        if (myBand.fileNo !== null) {
          const response = await this.$axios
            .get("/file/api/v1/files/" + myBand.fileNo, {
              headers: {
                Accept: "application/json",
              },
            })
            .catch(() => {
              alert("이미지 로드에 실패하였습니다.");
            });

          this.myBandImageMap.set(myBand.bandNo, response.data.path);
        }
      }
      this.leftBarLoading = true;
    },
  },
};
</script>

<template>
  <v-responsive>
    <label class="custom-my-band-title">내 그룹</label>
    <v-divider class="custom-divider"></v-divider>
    <v-divider class="custom-divider"></v-divider>
    <div v-if="leftBarLoading" class="band-list-flex">
      <router-link
        class="remove-line d-inline-block"
        v-for="myBand in myBandList"
        :key="myBand.bandNo"
        :to="{ path: '/bands/' + myBand.name }"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <v-img
                class="image-container"
                alt="no image"
                max-width="40px"
                :src="
                  myBandImageMap.has(myBand.bandNo)
                    ? myBandImageMap.get(myBand.bandNo)
                    : require('@/assets/band-no-image.png')
                "
              >
              </v-img>
            </span>
          </template>
          <span> {{ myBand.name }}</span>
        </v-tooltip>
      </router-link>
    </div>
    <v-divider class="custom-divider"></v-divider>
    <v-divider class="custom-divider"></v-divider>
  </v-responsive>
</template>

<style scoped>
.band-list-flex {
  padding: 0.8em 1em 0.6em;
  display: inline-block;
}

.image-container {
  aspect-ratio: 1/1;
  margin-left: 0.4em;
  border-radius: 10px;
  border: 2px solid darkgray;
}

.custom-divider {
  width: 95%;
  margin-left: 2.5%;
}

.custom-my-band-title {
  margin-left: 1em;
  font-size: 15px;
  font-weight: bold;
  opacity: 0.5;
}
</style>
