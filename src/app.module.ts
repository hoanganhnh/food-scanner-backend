import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      MongooseModule.forRootAsync({
         inject: [ConfigService],
         useFactory: (configService: ConfigService) =>
            ({
               uri: configService.get('DB_URL'),
               useNewUrlParser: true,
               useUnifiedTopology: true,
            } as MongooseModuleAsyncOptions),
      }),
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
