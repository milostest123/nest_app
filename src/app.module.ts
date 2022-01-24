import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres', 
      host:process.env.POSTGRES_HOST,
      port:parseInt(<string>process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true,
      logging:false,
      retryAttempts:12
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
