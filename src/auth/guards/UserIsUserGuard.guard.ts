import { CanActivate, ExecutionContext, forwardRef, Inject } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { User } from "src/users/models/user.interface";
import { UsersService } from "src/users/services/users.service";

export class UserIsUserGuard implements CanActivate{
    constructor(@Inject(forwardRef(()=>UsersService))
       private userService:UsersService
    ){

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req=context.switchToHttp().getRequest();

        const params=req.params;
        const user:User=req.user;

        return this.userService.findUserById(user.id).pipe(
            map((user:User)=>{
                let hasPermission=false;
                if(user.id===Number(params.id)){
                    hasPermission=true;
                }
                return user && hasPermission;
            })
        )
    }
}