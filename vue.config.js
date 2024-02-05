const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: {
      "/user": {
        target: "http://localhost:8090",
      },
    },
  },
});
