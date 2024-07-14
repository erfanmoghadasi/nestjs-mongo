import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
