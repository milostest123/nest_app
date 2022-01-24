import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "../../posts/models/post.entity";
import { UsersEntity } from "../../users/entity/user.entity";

@Entity({schema:'db_nest'})
export class CommentEntity{

    @PrimaryGeneratedColumn({name:'com_id'})
    id:number;

    @Column({name:'com_comment', type:'varchar', default:''})
    comment:string;

    @CreateDateColumn({name:'com_posted'}) 
    posted:Date;
    
    @ManyToOne(()=>UsersEntity, user=>user.comments,{onDelete:'SET NULL'})
    @JoinColumn({name:'usr_id'})
    author:UsersEntity;

    @ManyToOne(()=>PostEntity, post=>post.comments)
    @JoinColumn({name:'post_id'})
    post:PostEntity[]
}