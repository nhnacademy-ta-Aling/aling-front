<script>
import ServiceTermsBox from "@/views/user/signup/terms/ServiceTermsBox.vue";
import LeftNavBar from "@/components/LeftNavBar.vue";
import RightNavBar from "@/components/RightNavBar.vue";
import CustomHeader from "@/components/CustomHeader.vue";
import BasicButton from "@/views/commons/BasicButton.vue";

export default {
  name: "checkTerms",
  components: {
    BasicButton,
    ServiceTermsBox: ServiceTermsBox,
    CustomHeader: CustomHeader,
    LeftNavBar: LeftNavBar,
    RightNavBar: RightNavBar,
  },
  data: () => {
    return {
      articles: [
        {
          type: Object,
          id: "terms",
          articleTitle: "Aling 이용약관[필수]",
          articleText:
            "이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관" +
            "이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관" +
            "이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관" +
            "이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관",
          checkBoxInfo: {
            id: "checkBox" + this.id,
            label: "약관에 동의합니다.",
          },
        },
        {
          type: Object,
          id: "privacy",
          articleTitle: "개인정보 수집 및 이용[필수]",
          articleText:
            "개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용" +
            "개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용" +
            "개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용" +
            "개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용개인정보수집및이용" +
            "개인정보수집및이용개인정보수집및이용개인정보수집및이용",
          checkBoxInfo: {
            id: "checkBox" + this.id,
            label: "약관에 동의합니다.",
          },
        },
      ],
    };
  },
};
</script>

<template>
  <v-app id="inspire">
    <custom-header />
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <left-nav-bar />

          <v-col cols="14" sm="8">
            <v-sheet min-height="70vh" rounded="lg">
              <div
                :key="article.id"
                :id="article.id"
                v-for="article in articles"
              >
                <service-terms-box :article="article"></service-terms-box>
              </div>
            </v-sheet>
            <basic-button msg="Hello"></basic-button>
          </v-col>
          <right-nav-bar />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
div {
}
</style>
