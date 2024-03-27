<script>
import { onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    onMounted(() => {
      axios
        .get(
          "/user/api/v1/login/oauth/google?code=" +
            new URL(window.location.href).searchParams.get("code")
        )
        .then(() => {
          window.location = "/";
        })
        .catch(() => {
          alert("Google 로그인에 실패하였습니다. 재시도해주세요.");
          window.location = "/login";
        });
    });
  },
};
</script>
