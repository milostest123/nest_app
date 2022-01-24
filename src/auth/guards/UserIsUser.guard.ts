import { Injectable, CanActivate, Inject, forwardRef, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { User } from "src/users/models/user.interface";
import { UsersService } from "src/users/services/users.service";


@Injectable()
export class UserIsUserGuard implements CanActivate{

    constructor(
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService
    ) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const user: User = request.user;

        return this.userService.findUserById(user.id).pipe(
            map((user: User) => {
                let hasPermission = false;
                
                if(user.id === Number(params.id)) {
                    hasPermission = true;
                }

                return user && hasPermission;                
            })
        )
    }


}