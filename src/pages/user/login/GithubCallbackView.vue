<script>
import { onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    onMounted(() => {
      axios
        .get(
          "/user/api/v1/login/oauth/github?code=" +
            new URL(window.location.href).searchParams.get("code")
        )
        .then((r) => {
          console.log("then : " + r);
          window.location = "/";
        })
        .catch((r) => {
          console.log("catch : " + r);
          alert("요청 실패");
        });
    });
  },
};
</script>
