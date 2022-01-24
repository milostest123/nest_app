import { UsersEntity } from './entity/user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostEntity } from '../posts/models/post.entity';
import { CountryEntity } from './entity/country.entity';
import { CityEntity } from './entity/city.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UsersEntity,PostEntity, CountryEntity, CityEntity]), 
    AuthModule
  ],
  providers: [UsersService],
  exports:[UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
