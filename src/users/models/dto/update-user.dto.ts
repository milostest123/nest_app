import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../user.interface";

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly fullname:string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly password: string

    @IsNotEmpty()
    @IsEnum(UserRole)
    @IsOptional()
    readonly role?:UserRole

    @IsString()
    @IsOptional()
    readonly deleted:string

}