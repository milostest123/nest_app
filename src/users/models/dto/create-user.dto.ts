import { IsEmail, IsEnum, isEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../user.interface";

export class CreateUserDto{

    @IsEmail()
    readonly email:string;
     
    @IsString()
    readonly fullname:string

    @IsString()
    @IsNotEmpty()
    readonly password:string;
     
    @IsNotEmpty()
    @IsEnum(UserRole)
    readonly role?:UserRole
}