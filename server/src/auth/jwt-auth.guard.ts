import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req=context.switchToHttp().getRequest();
        // try {
            const [bearer,token] = req.headers.authorization.split(" ");
            console.log(bearer, token);

            if(!(bearer&&token)){
                throw new UnauthorizedException("trouble token");
            }
            console.log(this.jwtService)
            const user= this.jwtService.verify(token);
            req.user = user;
            return true;
        // }
        // catch(err){
        //     console.log(`\n\n${err}`)
        //     throw new UnauthorizedException({message: "unauthorized user"});
        // }
    }
}