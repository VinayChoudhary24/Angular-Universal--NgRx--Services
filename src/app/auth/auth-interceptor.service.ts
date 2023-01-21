import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";

// Get the State of App
import * as fromApp from '../store/app.reducer';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

    // To access token
    constructor( private authService: AuthService, private store: Store<fromApp.AppState> ) {}

    // this intercept will Attach Token to all Outgoing Requests 
    // Interface Provided by Angular
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // return this.authService.user.pipe(take(1),

        // Through NgRx
        // Use .select method to get the Slice of the State
        return this.store.select('auth').pipe(take(1),
        // For NgRx
        map( authState => {
          return authState.user; 
        }), 
        exhaustMap( (user) => {
            // To Check is the User is Present or Not
            if(!user) {
                return next.handle(req);
            }
        // clone the Request and Update
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
            return next.handle(modifiedReq);
        })
        );
    }
}