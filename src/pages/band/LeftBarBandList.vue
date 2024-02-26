<script>
export default {
  data() {
    return {
      myBandList: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios
        .get("/user/api/v1/users/my-bands")
        .then((response) => {
          this.myBandList = response.data;
        })
        .catch(() => {
          alert("left var server error");
        });
    },
  },
};
</script>

<template>
  <v-responsive>
    <label class="custom-my-band-title">내 그룹</label>
    <v-divider class="custom-divider"></v-divider>
    <v-divider class="custom-divider"></v-divider>
    <div class="band-list-flex">
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
                src="../../assets/band-no-image.png"
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
