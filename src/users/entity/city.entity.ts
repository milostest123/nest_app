import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "./country.entity";
import { PostEntity } from "../../posts/models/post.entity";

@Entity({schema:'db_nest'})
export class CityEntity{
 
    @PrimaryGeneratedColumn({name:'cit_id'})
    id:number;

    @Column({name:'cit_name',type:'varchar', default:''})
    name_country:string;

    @ManyToOne(()=>CountryEntity, country=>country.city)
    country:CountryEntity
    
    @OneToMany(()=>PostEntity, posts=>posts.city)
    posts:PostEntity[]
}