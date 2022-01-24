import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { from, map, Observable,of, switchMap } from 'rxjs';
import { User } from 'src/users/models/user.interface';
import { getManager, Repository } from 'typeorm';
import { PostEntity } from '../models/post.entity';
import { Posts } from '../models/post.interface';
const slugify = require('slugify') 

@Injectable()
export class PostsService {
  public entityManager = getManager();
  constructor(
      @InjectRepository(PostEntity) public postRepository:Repository<PostEntity>,
  ){}


  createPost(user:User, postEnt:Posts):Observable<Posts>{
      postEnt.author=user;
      console.log(postEnt);
          return from(this.postRepository.save(postEnt))
  }

  findAllPosts():Promise<Posts>{
    const allPosts = this.entityManager.query(`SELECT po.post_id,po.post_name, po.post_description, po.post_created, po.post_deleted, us.usr_id, us.usr_fullname, us.usr_email, us.usr_role
    FROM  db_nest.post_entity as po left JOIN db_nest.users_entity as us using(usr_id) where po.post_deleted='' order by post_created asc`);
    return allPosts;
  }

  findSinglePost(id:number):Observable<Posts>{
    return from(this.postRepository.findOne({ id }, { relations: ['author'] })).pipe(
      map((post: Posts) => {
          if (!post) {
              throw new HttpException(`Post not found with id = ${id}`, HttpStatus.NOT_FOUND);
          }
          
          return post;
      })
  )
  }

  updateOnePost(id:number, post:Posts):Observable<Posts>{
    delete post.name_post;
    delete post.description;

    return from(this.postRepository.update(id, post)).pipe(
        switchMap(() => this.findSinglePost(id))
    );
  }

  async deletePostById(id:number):Promise<any>{
    const findPostById= await this.entityManager.query(`select *  from db_nest.post_entity where post_id=${id}`)
    const sqlQueryDeletePost = await this.entityManager.query(`update db_nest.post_entity set post_deleted=1 where post_id=${id}`)
     if(findPostById.length<1){
       return{
         statusCode:HttpStatus.NOT_FOUND,
         message:`post with id = ${id} not found, please try other post`
       }
     }else if(findPostById.length>0){
       return{
         statusCode:HttpStatus.OK,
         message:`Success delete post with id = ${id}`,
         sqlQueryDeletePost
       }
     }
  }

  generateSlug(post_name: string): Observable<string> {
    return slugify(post_name);
}

}
