import { User } from "../../users/models/user.interface";

export interface Posts{
    id?:number;
    name_post?:string;
    image?:string;
    description?:string;
    created?:Date;
    deleted?:string;
    author?:User;
}