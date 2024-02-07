<script>
import ServiceTermsBox from "@/pages/user/signup/terms/ServiceTermsBox.vue";

export default {
  name: "checkTerms",
  components: {
    ServiceTermsBox: ServiceTermsBox,
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
            id: "checkBox1",
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
            id: "checkBox2",
            label: "약관에 동의합니다.",
          },
        },
      ],
    };
  },
};
</script>

<template>
  <v-sheet min-height="70vh" rounded="lg">
    <h1>대충 약관이 들어간다는 내용.</h1>
    <div :key="article.id" :id="article.id" v-for="article in articles">
      <service-terms-box :article="article"></service-terms-box>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">
div {
}
</style>
