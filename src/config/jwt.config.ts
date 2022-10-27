import { registerAs } from '@nestjs/config';
import { configService } from './config.service';

export default registerAs('jwt', () => configService.getJwt());
