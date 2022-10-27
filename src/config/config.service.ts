import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
//1.加载环境文件
// eslint-disable-next-line @typescript-eslint/no-var-requires
const envPath = require('path').join(
  process.cwd(),
  `/config/${process.env.NODE_ENV || 'dev'}.yaml`,
);
if (!fs.existsSync(envPath)) {
  console.error(envPath + ',file not found');
  process.exit(-1);
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('dotenv-yaml').config({ path: envPath }).parsed;

class ConfigService {
  public isProduction() {
    return false;
  }

  public getRedisConfig() {
    return config.redis;
  }

  public getJwt() {
    return config.jwt;
  }

  public getConfig() {
    return config;
  }

  public websiteEndpoint() {
    return config.website?.endpoint;
  }

  getMongo(): { uri: string } {
    return config.mongo;
  }
}

const configService = new ConfigService();

export { configService };
