import { Posts } from "src/posts/models/post.interface";
import { User } from "src/users/models/user.interface";

export interface Comments{
    id:number;
    comment:string;
    posted:Date;
    author?:User;
    post?:Posts
}