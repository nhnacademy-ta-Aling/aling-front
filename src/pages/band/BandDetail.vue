<script>
export default {
  data() {
    return {
      loading: false,
      bandDetail: null,
      error: null,
    };
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
          this.bandDetail = response.data;
          console.log(this.bandDetail);
        })
        .catch((error) => {
          this.error = error.toString();
        });
    },
  },
};

//this.$route.params
</script>

<template>
  <v-sheet color="" min-height="70vh" rounded="lg">
    <v-card class="post-card">
      <v-row>
        <v-col cols="2">
          <v-img
            class="image-container"
            alt="no image"
            min-width="30px"
            max-width="70px"
            src="../../assets/band-no-image.png"
          ></v-img>
        </v-col>
        <v-col cols="10">
          <v-card-title class="v-card-title">
            {{ bandDetail.name }}
          </v-card-title>
          <v-card-subtitle></v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
    <!--    그룹 게시물 리스트-->
  </v-sheet>
</template>

<style scoped>
.image-container {
  top: 40%;
  left: 55%;
  margin: -25px 0 0 -15px;
}
</style>
