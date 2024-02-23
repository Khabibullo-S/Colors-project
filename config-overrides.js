module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["react-app"],
        plugins: ["@emotion/babel-plugin"],
      },
    },
  });

  return config;
};
