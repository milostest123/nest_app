import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Posts } from 'src/posts/models/post.interface';
import { User } from 'src/users/models/user.interface';
import { getManager, Repository } from 'typeorm';
import { CommentEntity } from '../models/comment.entity';
import { Comments } from '../models/comment.interface';

@Injectable()
export class CommentService {
    public entityManager = getManager();

    constructor(
        @InjectRepository(CommentEntity) public commentRepository:Repository<CommentEntity>,
    ){}

    postComment(user:User, commentEnt:Comments, post:Posts){
        commentEnt.author=user;
        commentEnt.post=post;
        console.log(commentEnt);

        // return this.commentRepository.save(commentEnt)
        
    }
}
