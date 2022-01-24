import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserIsUserGuard } from 'src/auth/guards/UserIsUserGuard.guard';
import { User, UserRole } from '../models/user.interface';
import { UsersService } from '../services/users.service';

@Controller('api/')
export class UsersController {

  constructor(private userSer: UsersService) { }

  //function add user in DB
  @Post('users')
  createUser(@Body() user: User) {
    return this.userSer.createUser(user);
  }

  //function return all users where usr_deleted is null
  @Get('users')
  findAll() {
    return this.userSer.findAllUsers();
  }

  //Function update user where user id=?
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put('users/:id')
  updateUser(@Param('id') id: number, @Body() user: User) {
    return this.userSer.updateOne(id, user)
  }

  //Function update user role where user id=?
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/users/role/:id')
  updateUserRole(@Param('id') id: number, @Body() user: User) {
    return this.userSer.updateUserRole(id, user);
  }

  //Function delete user where user id=? only if role is ADMIN
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('users/:id')
  deleteUser(@Param('id') id: number) {
    return this.userSer.deleteUser(id);
  }

  //Function return user where id=?
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('users/:id')
  findById(@Param('id') id: number): Observable<Object> {
    return this.userSer.findUserById(id);
  }

  //Login user with jwt
  @Post('auth/login')
  @HttpCode(200)
  login(@Body() user: User): Observable<Object> {
    return this.userSer.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      })
    )
  }
}
