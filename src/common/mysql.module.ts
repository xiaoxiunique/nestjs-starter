import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './../entities/mysql';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: 'mc-note',
      entities: [...Object.values(entities)],
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class MysqlModule {
}
