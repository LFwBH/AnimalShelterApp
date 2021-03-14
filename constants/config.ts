import Constants from "expo-constants";

const { port, scheme, host } = Constants.manifest.extra;

const config = {
  apiUrl: `${scheme}://${host}:${port}`,
  defaultPageNumber: 10,
} as const;

export default config;
