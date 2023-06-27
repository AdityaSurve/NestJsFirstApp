import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ProductModule } from './product/product.module';
import * as cors from 'cors';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
