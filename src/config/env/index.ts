import developEnv from "./dev";
import productionEnv from "./prd";
const environment = import.meta.env;
const currentEnv = environment?.MODE ?? "develop";
const getEnvFiles = (): Record<string, any> => {
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
