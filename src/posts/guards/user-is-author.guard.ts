import { Injectable,CanActivate, ExecutionContext } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { User } from "src/users/models/user.interface";
import { UsersService } from "src/users/services/users.service";
import { Posts } from "../models/post.interface";
import { PostsService } from "../services/posts.service";


@Injectable()
export class UserIsAuthorGuard implements CanActivate{
  constructor(private userService:UsersService, private postService:PostsService){}

  canActivate(context: ExecutionContext): Observable<boolean> {
       const request=context.switchToHttp().getRequest();
       const params = request.params;
       const postEntId:number=Number(params.id);
       const user:User = request.user;

       return this.userService.findUserById(user.id).pipe(
           map((posts:Posts)=>{
               let hasPermission=false;
               if(user.id === posts.author.id){
                   hasPermission=true;
               }

               return user && hasPermission;
           })
       )
  }
}