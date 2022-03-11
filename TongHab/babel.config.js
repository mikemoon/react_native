module.exports = {
  presets: ['module:metro-react-native-babel-preset',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    "plugins": [
      ["module-resolver", {
        "alias": {
          "^react-native$": "react-native-web"
        }
      }]
    ] 
};
