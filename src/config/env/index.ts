import devEnv from "./dev";
import prdEnv from "./prd";
import testEnv from "./test";
const environment = import.meta.env;
const currentEnv = environment?.MODE ?? "develop";
const getEnvFiles = (): Record<string, any> => {
  switch (currentEnv) {
    case "develop":
      return devEnv;
    case "test":
      return testEnv;
    case "production":
      return prdEnv;
    default:
      return devEnv;
  }
};
export default getEnvFiles();
