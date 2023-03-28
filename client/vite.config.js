const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const svgrPlugin = require("vite-plugin-svgr");

module.exports = defineConfig({
  plugins: [react(), svgrPlugin()],
  css: {
    preprocessorOptions: {
      postcss: require("./postcss.config.js"),
    },
  },
  base: "/",
});
