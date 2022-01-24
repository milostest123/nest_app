
import {BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../models/user.interface";
import { CommentEntity } from "../../comment/models/comment.entity";
import { CountryEntity } from "./country.entity";
import { PostEntity } from "../../posts/models/post.entity";


@Entity({schema:'db_nest'})
export class UsersEntity {


  @PrimaryGeneratedColumn({name:'usr_id'})
  id: number;

  @Column({name:'usr_fullname', type:'varchar', default: '' })
  fullname: string; 

  @Column({name:'usr_email', type:'varchar', default: '', unique:true })
  email: string;

  @Column({name:"usr_password",nullable:false,select:false,})
  password: string;
  
  @Column({name:"usr_role",type: 'enum', enum: UserRole, default: UserRole.USER})
  role: UserRole;

  @CreateDateColumn({name:'usr_created'})
  created: Date;

  @Column({name:'usr_deleted', type:'varchar', default: '' })
  deleted: string;
   
  @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    @OneToMany(()=>CommentEntity, comment=>comment.author,{cascade:['insert','update']})
    comments:CommentEntity[];
     
    @OneToMany(()=> PostEntity, post=>post.author, { lazy:true})
    posts:PostEntity[];

    @ManyToOne(()=>CountryEntity, country=>country.user)
    country:CountryEntity
}


 