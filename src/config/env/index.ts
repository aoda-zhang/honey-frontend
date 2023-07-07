const currentEnv = process.env?.NODE_ENV ?? 'develop'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const envFile = require(`./${currentEnv}`)
const envConfig = {
  baseURL: envFile?.baseURL
}
export default envConfig
