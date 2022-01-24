import { UsersEntity } from '../entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.interface'
import { from, map, Observable, of, switchMap } from 'rxjs';
import { hash } from 'bcryptjs'
import { AuthService } from 'src/auth/services/auth.service';
import { PostEntity } from '../../posts/models/post.entity';
const slugify = require('slugify');

@Injectable()
export class UsersService {
    public entityManager = getManager();
    constructor(
        @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        private authService: AuthService
    ) { }



    //Create a new user into DB
    async createUser(user: User) {
        try {
            const userData = await this.findUserByEmail(user.email);
            console.log(userData);
            if (!userData) {

                user.password = await hash(user.password, 10);
                return this.userRepository.save(user);

            }
        } catch (err: any) {
            if (err) {
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: 'User with this email alredy exist'
                }, 409)
            }
        }
    }

    //Return all active users fromDB where usr_deleted is null
    findAllUsers() {
        const allUsers = this.entityManager.query(`select usr_id, usr_fullname, usr_email, usr_password, usr_created, usr_deleted from db_nest.users_entity where usr_deleted='' order by usr_created asc`);
        return allUsers;
    }

    //Update user role in DB sent a Object of user and update any parametar
    updateUserRole(id: number, user: User) {
        return from(this.userRepository.update(id, user));
    }

    //Update user in DB sent a Object of user and update any parametar
    updateOne(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        delete user.role;

        return from(this.userRepository.update(id, user)).pipe(
            switchMap(() => this.findUserById(id))
        );
    }


    //Soft delete user from DB insert just 1 into row usr_deleted
    async deleteUser(id: number) {
        const checkUserExist= await this.entityManager.query(`select * from db_nest.users_entity where usr_id=${id}`);
        console.log(checkUserExist.length);
        
        const sqlQuery = await this.entityManager.query(`update db_nest.users_entity set usr_deleted=1 where usr_id=${id}`)
        if (checkUserExist.length<1) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `user with id = ${id} not exist, please try again`
            }
        }  
        if(checkUserExist.length>0) {
            return {
                statusCode: HttpStatus.OK,
                message: `user with id= ${id} success deleted`,
                sqlQuery
            }
        }
    }


    //Return user for sent id
    findUserById(id: number): Observable<User> {
        return from(this.userRepository.findOne({ id }, { relations: ['posts'] })).pipe(
            map((user: User) => {
                if (!user) {
                    throw new HttpException(`User not found with id = ${id}`, HttpStatus.NOT_FOUND);
                }
                const { password, ...result } = user;
                delete user.password;
                return result;
            })
        )
    }

    //Return user for sent email
    findUserByEmail(email: string) {
        return this.userRepository.findOne({ email })

    }


    //Function for login user if exist in DB
    login(user: User): Observable<any> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }


    //Validate user before login
    validateUser(email: any, password: any): Observable<User> {
        return from(this.userRepository.findOne({ email }, { select: ['id', 'fullname', 'email', 'password', 'role'] })).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if (match) {
                        return user;
                    } else {
                        throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
                    }
                })
            ))
        )
    }

}
