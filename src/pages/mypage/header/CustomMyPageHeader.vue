<template>
  <div>
    <v-app-bar app color="white" light :elevatio="2" height="55em">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-sm-and-down">
        <a href="/">
          <img src="@/assets/logo.svg" class="img-logo" alt="logo" />
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
        <v-tabs>
          <v-tab
            key="my-info"
            style="min-width: 60px; max-width: 60px; min-height: 55px; top: 2px"
          >
            <router-link to="/my-page">
              <img
                class="img-logo-route"
                :src="require('@/assets/icons/006-my-info.svg')"
                alt="group"
              />
            </router-link>
          </v-tab>
          <v-tab
            key="band"
            style="min-width: 60px; max-width: 60px; min-height: 55px; top: 2px"
          >
            <router-link to="/my-page/bands">
              <img
                class="img-logo-route"
                :src="require('@/assets/icons/005-group-management.svg')"
                alt="band"
              />
            </router-link>
          </v-tab>
          <v-tab
            key="scrap"
            style="min-width: 60px; max-width: 60px; min-height: 55px; top: 2px"
          >
            <router-link to="/my-page/scraps">
              <img
                class="img-logo-route"
                :src="require('@/assets/icons/007-heart-dir.svg')"
                alt="scrap"
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
          <v-list-item :href="'/my-page'">
            <v-list-item-title>프로필</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4" color="#3D6BFF">
          <v-list-item :href="'/my-page'">
            <v-list-item-icon>
              <v-icon>person</v-icon>
            </v-list-item-icon>
            <v-list-item-title>내 정보</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item :href="'/my-page/bands'">
            <v-list-item-icon>
              <v-icon>groups</v-icon>
            </v-list-item-icon>
            <v-list-item-title>그룹 관리</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item :href="'/my-page/scraps'">
            <v-list-item-icon>
              <v-icon>scrap</v-icon>
            </v-list-item-icon>
            <v-list-item-title>스크랩</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "custom-my-page-header",
  data: () => ({
    drawer: false,
  }),
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
