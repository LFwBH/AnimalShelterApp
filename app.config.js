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
};
