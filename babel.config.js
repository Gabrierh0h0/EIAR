module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // otros plugins que tengas...
      "react-native-reanimated/plugin", // <= debe ir de último
    ],
  };
};
