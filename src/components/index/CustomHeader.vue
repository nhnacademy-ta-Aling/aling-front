<template>
  <div>
    <v-app-bar app color="white" light :elevatio="2" height="55em">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-sm-and-down" style="padding-left: 0">
        <a href="/">
          <img
            src="@/assets/logo.svg"
            class="img-logo"
            alt="logo"
            style="height: 42px"
          />
        </a>
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
          style="
            width: 13rem;
            height: 43px;
            padding-top: 10px;
            padding-left: 5px;
            margin-right: 5px;
          "
        />
        <v-btn icon>
          <v-icon size="27">mdi-magnify</v-icon>
        </v-btn>
        <div style="padding: 0 5px 0 3px">
          <v-tabs style="display: contents; height: 0">
            <v-tab
              key="home"
              style="min-width: 60px; min-height: 55px; top: 2px"
            >
              <router-link to="/">
                <img
                  class="img-logo-route"
                  :src="require('@/assets/icons/001-home.svg')"
                  alt="home"
                />
              </router-link>
            </v-tab>
            <v-tab
              key="recruit"
              style="min-width: 60px; min-height: 55px; top: 2px"
            >
              <router-link to="#">
                <img
                  class="img-logo-route"
                  :src="require('@/assets/icons/002-recruit.svg')"
                  alt="recruit"
                  style="margin-bottom: 3px"
                />
              </router-link>
            </v-tab>
            <v-tab
              key="band"
              style="min-width: 60px; min-height: 55px; top: 2px"
            >
              <router-link to="/bands">
                <img
                  class="img-logo-route"
                  :src="require('@/assets/icons/003-group.svg')"
                  alt="band"
                  style="margin-bottom: 3px"
                />
              </router-link>
            </v-tab>
            <v-tab
              key="notify"
              style="min-width: 60px; min-height: 55px; top: 2px"
            >
              <router-link to="#">
                <img
                  class="img-logo-route"
                  :src="require('@/assets/icons/004-notice.svg')"
                  alt="notice"
                  style="margin-bottom: 3px"
                />
              </router-link>
            </v-tab>
          </v-tabs>
        </div>
      </v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar color="#3D6BFF" size="32" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item :href="'/my-page'">
            <v-list-item-title>프로필</v-list-item-title>
          </v-list-item>
          <v-list-item :href="'/my-page/bands'">
            <v-list-item-title>그룹 관리</v-list-item-title>
          </v-list-item>
          <v-list-item v-for="n in 4" :key="n" @click="() => {}">
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
