import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
   }),
    ,DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
