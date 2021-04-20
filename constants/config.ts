import Constants from "expo-constants";

interface ExpoManifest {
  port: number;
  scheme: string;
  host: string;
}

const { port, scheme, host } = Constants.manifest.extra as ExpoManifest;

const config = {
  apiUrl: `${scheme}://${host}:${port}`,
  defaultPageNumber: 10,
} as const;

export default config;
