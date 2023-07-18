import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { HttpErrorFilter } from './shared/http-error.filter';
import { ConfigService } from './config-service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule, ConfigModule.forRoot({ envFilePath: ['.env'] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: +ConfigService.getENV().DB_PORT,
      username: ConfigService.getENV().DB_USERNAME,
      password: ConfigService.getENV().DB_PASSWORD,
      database: ConfigService.getENV().DB,
      autoLoadEntities: true,
      // synchronize: true,
      logging: true,
    }),
    SharedModule,
    TodoModule
],
  controllers: [AppController],
  providers: [AppService,
    {
      provide:APP_FILTER,
      useClass:HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass:LoggingInterceptor
    }
],
})
export class AppModule { }
