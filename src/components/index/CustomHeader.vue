<template>
  <div>
    <v-app-bar app color="white" light :elevatio="2" height="55em">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-sm-and-down">
        <img src="@/assets/logo.svg" class="img-logo" alt="logo" />
      </v-app-bar-title>
      <v-spacer class="hidden-md-and-up" />
      <v-app-bar-title class="hidden-md-and-up" style="margin-left: 2em">
        <img src="@/assets/logo.svg" class="img-logo" alt="logo" />
      </v-app-bar-title>
      <v-spacer class="hidden-md-and-up" />
      <v-btn icon class="hidden-md-and-up">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer class="hidden-sm-and-down" />
      <v-toolbar-items class="hidden-sm-and-down">
        <basic-input
          type="text"
          placeholder="Search..."
          style="width: 13rem; height: 48px"
        />
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-tabs>
          <v-tab key="home">
            <router-link to="/">
              <img
                class="img-logo-route"
                :src="require('@/assets/icons/001-home.svg')"
                alt="home"
              />
            </router-link>
          </v-tab>
          <v-tab key="recruit">
            <router-link to="#">
              <img
                class="img-logo-route"
                :src="require('@/assets/icons/002-recruit.svg')"
                alt="recruit"
              />
            </router-link>
          </v-tab>
          <v-tab key="group">
            <router-link to="/bands">
              <img
                class="img-logo-route"
                :src="require('@/assets/icons/003-group.svg')"
                alt="group"
              />
            </router-link>
          </v-tab>
          <v-tab key="notify">
            <router-link to="#">
              <img
                class="img-logo-route"
                :src="require('@/assets/icons/004-notice.svg')"
                alt="notice"
              />
            </router-link>
          </v-tab>
        </v-tabs>
      </v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar color="#3D6BFF" size="32" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>프로필</v-list-item-title>
          </v-list-item>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4" color="#3D6BFF">
          <v-list-item :href="'/'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item :href="'#'">
            <v-list-item-icon>
              <v-icon>handshake</v-icon>
            </v-list-item-icon>
            <v-list-item-title>채용공고</v-list-item-title>
          </v-list-item>

          <v-list-item :href="'/bands'">
            <v-list-item-icon>
              <v-icon>groups</v-icon>
            </v-list-item-icon>
            <v-list-item-title>그룹</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import BasicInput from "@/components/commons/BasicInput.vue";

export default {
  name: "custom-header",
  data: () => ({
    drawer: false,
  }),
  components: {
    BasicInput: BasicInput,
  },
};
</script>

<style scoped>
.img-logo {
  margin-top: 0.5em;
  object-fit: fill;
}

.img-logo .mini {
  height: 3em;
  width: 3em;
}

.img-logo-route {
  width: 3em;
  height: 3em;
}
</style>
