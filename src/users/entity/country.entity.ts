import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityEntity } from "./city.entity";
import { UsersEntity } from "./user.entity";

@Entity({schema:'db_nest'})
export class CountryEntity{
 
    @PrimaryGeneratedColumn({name:'cou_id'})
    id:number;

    @Column({name:'cou_name',type:'varchar', default:''})
    name_country:string
    
    @OneToMany(()=>UsersEntity, user=>user.country,{cascade:['insert','update']})
    user:UsersEntity[];

    @OneToMany(()=>CityEntity, city=>city.country, {cascade:['insert','update']})
    city:CityEntity[];
}