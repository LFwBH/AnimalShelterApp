import { NativeModules } from "react-native";
import Reactotron, { asyncStorage } from "reactotron-react-native";
import url from "url";

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

Reactotron.configure({ host: hostname })
  .use(asyncStorage())
  .useReactNative()
  .connect();
