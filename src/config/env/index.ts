import developEnv from "./develop";
import productionEnv from "./production";
const environment = import.meta.env;
const currentEnv = environment?.MODE ?? "develop";
interface EnvType {
  baseURL: string;
  commonErrorMessage: string;
  colorPrimary: string;
  oilPrice: string;
}
const getEnvFiles = (): EnvType => {
  switch (currentEnv) {
    case "develop":
      return developEnv;
    case "production":
      return productionEnv;
    default:
      return developEnv;
  }
};
export default getEnvFiles();
