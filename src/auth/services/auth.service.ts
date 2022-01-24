import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/users/models/user.interface';
import { hash,compare } from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: User): Observable <string> {
        return from(this.jwtService.signAsync({user}));
    }

    hashPassword(password: string): Observable <string> {
        return from<string>(hash(password, 12));

    }

    comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
        return from(compare(newPassword, passwortHash));
    }

}