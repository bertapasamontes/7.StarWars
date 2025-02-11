import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { SignUpService } from "../services/sign-up.service";
import { AuthService } from "../services/authService/auth.service";
import { User } from "firebase/auth";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AuthService
    ) {
        const usuarioEnLocal = localStorage.getItem('user');
        if(usuarioEnLocal){
            console.log("tengo algo en local");
            // localStorage.clear();
        }
        
    }
    usuario: User | null = null;
    userIsLogged = false;


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const user = this.accountService.currentUser?.displayName;
        if (user) {
            //autorizado
            this.userIsLogged=true;
            console.log("usuario autorizado");
        }
        if(this.userIsLogged === true){
            console.log("user is logued 2 = true");
            return true;
        }
        else{
            // not logged in so redirect to login page with the return url
            console.log("user NO autorizado")
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        
    }
}