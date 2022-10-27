import { ConfigModule } from '@nestjs/config';
import database from './database.config';
import redis from './redis.config';
import cache from './cache.config';
import jwt from './jwt.config';
import { Module } from '@nestjs/common';
import { configService } from './config.service';

@Module({
  imports: [
    //config module
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      load: [redis, cache, configService.getConfig, database, jwt], //加载组合配置
    }),
  ],
  providers: [],
  exports: [ConfigModule],
})
export class AppSharedModule {}
