import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

// Get the State
import * as fromApp from '../store/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor( private authService: AuthService,
        // When the user tries to visit a URL that is Blocked
        private router: Router, private store: Store<fromApp.AppState> ) {}

    canActivate( route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
    | boolean 
    | UrlTree
    | Promise<boolean | UrlTree> 
    | Observable<boolean | UrlTree> {
        // return this.authService.user.pipe(take(1), map( (user) => {
          
          // Through NgRx
          // Use .select method to get the Slice of the State
          return this.store.select('auth').pipe(take(1),
          // for NgRx
          map( authState => {
            return authState.user;
          }),

          map( (user) => {
            // When the user tries to visit a URL that is Blocked
            const isAuth = !!user
            if(isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth'])
        }), 
         // When the user tries to visit a URL that is Blocked
        // tap( (isAuth) => {
        //     if(!isAuth) {
        //         this.router.navigate(['/auth'])
        //     }
        // })
        )
    }
}