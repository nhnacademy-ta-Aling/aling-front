<script>
import TermsArticleTitle from "@/views/user/signup/terms/TermsArticleTitle.vue";
import TermsArticle from "@/views/user/signup/terms/TermsArticle.vue";
import TermsCheckBox from "@/views/user/signup/terms/TermsCheckBox.vue";

export default {
  name: "serviceTermsBox",
  props: {
    article: {
      type: Object,
      articleTitle: "",
      articleText: "",
    },
    checkBoxInfo: {
      id: {
        type: String,
        default: "",
      },
      label: {
        type: String,
        default: "",
      },
    },
  },
  components: {
    TermsArticleTitle: TermsArticleTitle,
    TermsArticle: TermsArticle,
    TermsCheckBox: TermsCheckBox,
  },
};
</script>

<template>
  <div class="align-self-center v-row">
    <terms-article-title
      :article-title="article.articleTitle"
    ></terms-article-title>
    <terms-article :article-text="article.articleText"></terms-article>
    <terms-check-box
      :id="checkBoxInfo.id"
      :label="checkBoxInfo.label"
    ></terms-check-box>
  </div>
</template>

<style scoped lang="scss">
div {
  border: 1px black solid;
}
</style>
