import { Body, Controller, Post,Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Comments } from '../models/comment.interface';
import { CommentService } from '../services/comment.service';

@Controller('comment/')
export class CommentController {
    
    constructor(private commService:CommentService){} 
    
    @UseGuards(JwtAuthGuard)
    @Post('save')
    saveComment(@Body() comm:Comments, @Request() req){
        const user=req.user;
        const post=req.id
        return this.commService.postComment(user,comm,post)
    }
}
