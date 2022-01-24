import { Comments } from "src/comment/models/comment.interface";
import { Posts } from "../../posts/models/post.interface";

export interface User {
    id?: number;
    fullname: string;
    email: string;
    password?: string;
    role:UserRole;
    created: Date;
    deleted: string;
    post?:Posts[];
    comment?:Comments[]
}

export enum UserRole{
    ADMIN='admin',
    EDITOR='editor',
    USER='user'
}