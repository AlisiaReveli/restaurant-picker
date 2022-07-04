import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOptions } from 'config/db-config.service';
import { ApiModule } from './api/api.module';
@Module({
  imports: [TypeOrmModule.forRoot(configOptions), ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
