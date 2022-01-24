import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityEntity } from "../../users/entity/city.entity";
import { CommentEntity } from "../../comment/models/comment.entity";
import { UsersEntity } from "../../users/entity/user.entity";

@Entity({schema:'db_nest'})
export class PostEntity{
 
    @PrimaryGeneratedColumn({name:'post_id'})
    id:number;

    @Column({name:'post_name', type:'varchar', default:''})
    post_name:string;

    @Column({name:'post_image',type:'bytea',nullable:true})
    image:string;

    @Column({name:'post_description', type:'text', default:''})
    description:string;

    @CreateDateColumn({name:'post_created'})
    created: Date;

    @Column({name:'post_deleted', type:'varchar', default:''})
    deleted:string;

    @ManyToOne(()=>UsersEntity, user=>user.posts)
    @JoinColumn({name:'usr_id'})
    author:UsersEntity;

    @OneToMany(()=>CommentEntity, comment=>comment.post)
    comments:CommentEntity;

    @ManyToOne(()=>CityEntity, city=>city.posts)
    @JoinColumn({name:'cit_id'})
    city:CityEntity[]
}