<script>
export default {
  data() {
    return {
      loading: false,
      bandList: null,
      bandImageMap: new Map(),
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.error = this.bandList = null;
      this.loading = true;
      await this.$axios
        .get("/user/api/v1/users/my-bands")
        .then((response) => {
          this.loading = false;
          this.bandList = response.data;
        })
        .catch((error) => {
          this.error = error.toString();
        });

      for (const band of this.bandList) {
        if (band.fileNo !== null) {
          const response = await this.$axios
            .get("/file/api/v1/files/" + band.fileNo, {
              headers: {
                Accept: "application/json",
              },
            })
            .catch(() => {
              alert("이미지 로드에 실패하였습니다.");
            });

          this.bandImageMap.set(band.bandNo, response.data.path);
        }
      }
      this.loading = true;
    },
  },
  computed: {
    viewBandInfo() {
      return function (bandInfo) {
        let leng = bandInfo.substring(0, window.innerWidth / 25).length;
        if (leng < bandInfo.length)
          return bandInfo.substring(0, window.innerWidth / 25) + " ...";
        else return bandInfo;
      };
    },
  },
};
</script>

<template>
  <v-sheet color="" min-height="70vh" rounded="lg">
    <router-link
      class="remove-line"
      v-for="band in bandList"
      :to="{ path: '/bands/' + band.name }"
      :key="band.bandNo"
    >
      <v-card v-if="loading" class="post-card">
        <v-row>
          <v-col cols="3">
            <v-img
              class="image-container"
              alt="no image"
              min-width="60px"
              max-width="100px"
              :src="
                bandImageMap.has(band.bandNo)
                  ? bandImageMap.get(band.bandNo)
                  : require('@/assets/band-no-image.png')
              "
            ></v-img>
          </v-col>
          <v-col cols="9">
            <v-card-title class="v-card-title">
              {{ band.name }}
            </v-card-title>
            <v-card-subtitle class="blurry-font more-dense">
              <p class="custom-inline">즉시 가입 여부</p>
              <p class="custom-inline" v-if="band.isEnter">O</p>
              <p class="custom-inline" v-else>X</p>
              <p class="custom-inline">게시글 공개 여부</p>
              <p class="custom-inline" v-if="band.isViewContent">O</p>
              <p class="custom-inline" v-else>X</p>
            </v-card-subtitle>
            <v-card-subtitle class="custom-bandInfo-subtitle"
              >{{ viewBandInfo(band.info) }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </router-link>
  </v-sheet>
</template>

<style scoped>
.post-card {
  margin-top: 1em;
  margin-left: 0.3em;
  margin-right: 0.3em;
}

.post-card:hover {
  background-color: #f3f3f3;
  transform: translateY(-0.5px);
}

.image-container {
  border-radius: 10px;
  border: 2px solid grey;
  top: 1em;
  margin-left: 35%;
  align-items: center;
  aspect-ratio: 1/1;
}

.v-card-title {
  font-weight: 400; /* 폰트 굵기 설정 */
}

.remove-line {
  text-decoration: none;
  color: inherit;
}

.blurry-font {
  font-size: 13px;
  opacity: 0.5;
}

.custom-inline {
  margin-right: 2%;
  display: inline-block;
}

.more-dense {
  margin-bottom: 0.1em;
  padding-bottom: 0.1em;
}

.custom-bandInfo-subtitle {
  background-color: #f0f0f0;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 1em;
  margin-left: 1em;
  margin-right: 1em;
}
</style>
