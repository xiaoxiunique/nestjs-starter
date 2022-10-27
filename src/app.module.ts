import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppSharedModule } from './config/app-shared.module';
import { DatabaseModule } from './common/database.module';

@Module({
  imports: [
    DatabaseModule,
    AppSharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
