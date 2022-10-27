import { Module } from '@nestjs/common';
import { MysqlModule } from './mysql.module';

@Module({
  imports: [
    MysqlModule
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
