<script>
export default {
  data() {
    return {
      loading: false,
      bandList: null,
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.bandList = null;
      this.loading = true;
      this.$axios
        .get("/user/api/v1/users/my-bands")
        .then((response) => {
          this.loading = false;
          this.bandList = response.data;
        })
        .catch((error) => {
          this.error = error.toString();
        });
    },
  },
  computed: {
    viewBandInfo() {
      return function (bandInfo) {
        let leng = bandInfo.toString().substring(0, window.innerWidth / 20);
        if (leng < bandInfo.length)
          return (
            bandInfo.toString().substring(0, window.innerWidth / 10) + " ..."
          );
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
      <v-card class="post-card">
        <v-row>
          <v-col cols="3">
            <v-img
              class="image-container"
              alt="no image"
              min-width="40px"
              max-width="70px"
              src="../../assets/band-no-image.png"
            ></v-img>
          </v-col>
          <v-col cols="9">
            <v-card-title class="v-card-title">
              {{ band.name }}
            </v-card-title>
            <v-card-subtitle>{{ viewBandInfo(band.info) }}</v-card-subtitle>
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
  top: 40%;
  left: 55%;
  margin: -25px 0 0 -25px;
}

.v-card-title {
  font-weight: 400; /* 폰트 굵기 설정 */
}

.remove-line {
  text-decoration: none;
  color: inherit;
}
</style>
