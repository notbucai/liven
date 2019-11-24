import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './module/users/users.module';
@Module({
  imports: [TypegooseModule.forRoot('mongodb://localhost/liven', { useNewUrlParser: true, useUnifiedTopology: true }), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
