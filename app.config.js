import "dotenv/config";

const {
  REACT_APP_API_HOST: HOST,
  REACT_APP_API_PORT: PORT,
  REACT_APP_API_SCHEME: SCHEME,
} = process.env;

export default {
  extra: {
    port: PORT,
    scheme: SCHEME,
    host: HOST,
  },
  expo: {
    name: "AnimalShelterApp",
    slug: "AnimalShelterApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "animalshelter",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.animalshelter.app",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.animalshelter.app",
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
  },
};
