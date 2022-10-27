import { registerAs } from '@nestjs/config';
import { configService } from './config.service';

export default registerAs('cache', () => configService.getRedisConfig());
