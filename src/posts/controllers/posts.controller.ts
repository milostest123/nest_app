import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { DeleteResult } from 'typeorm';
import { UserIsAuthorGuard } from '../guards/user-is-author.guard';
import { Posts } from '../models/post.interface';
import { PostsService } from '../services/posts.service';

@Controller('posts/')
export class PostsController {

    constructor(private postService:PostsService){}

    @UseGuards(JwtAuthGuard)
    @Post('add_post')
    createPost(@Body() posts:Posts, @Request() req):Observable<any>{
       const user=req.user;
       return this.postService.createPost(user,posts);
    }

    @Get('all_posts')
    allPosts():Promise<any>{
        return this.postService.findAllPosts();
    }
    
    @Get(':id')
    findPostById(@Param('id') id:number):Observable<Posts>{
        return this.postService.findSinglePost(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateOnePost(@Param('id') id: number, @Body() post: Posts): Observable<Posts> {
        return this.postService.updateOnePost(Number(id), post);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePostById(@Param('id') id:number):Promise<any>{
        return this.postService.deletePostById(id);
    }

}
