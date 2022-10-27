import { registerAs } from '@nestjs/config';
import { configService } from './config.service';

export default registerAs('database', () => configService.getMongo());
