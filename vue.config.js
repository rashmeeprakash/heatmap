module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"), // Use Dart Sass
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        os: require.resolve("os-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        vm: require.resolve("vm-browserify"),
        path: require.resolve("path-browserify"),
      },
    },
  },
};
