import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './models/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
   TypeOrmModule.forFeature([PostEntity]),
   AuthModule,
   UsersModule
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
