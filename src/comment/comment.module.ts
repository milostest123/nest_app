import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CommentEntity } from './models/comment.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([CommentEntity]),
    AuthModule,
    UsersModule
   ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
