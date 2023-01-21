import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})

export class AuthComponent implements OnInit, OnDestroy {
    // To switch between the User
    isLoginMode = true;

    // This is for the Loading-Spinner
    isLoading = false;

    // This is for the ERROR
    error: string = null;

    // Handle the Subscription
    private storeSub: Subscription;

    constructor( private authService: AuthService,
        // Inject Router to Track the State of the User
                private router: Router, private store: Store<fromApp.AppState> ) {}

    // 
    ngOnInit(): void {
      // Subscribe The Login Http Request with Select
      // Adding Through NgRx
    // Use .select method to get the Slice of the State
    this.storeSub = this.store.select('auth').subscribe( authState => {
      // set the Loading
      this.isLoading = authState.loading;
      // Set the Error
      this.error = authState.authError;
    })
    }

    // Method to swith Modes
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    // This will Submit the Form
    onSubmit(form: NgForm) {
        // console.log(form.value);
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        // To Store the The SignUp/Login Requests and Subscribe One
        // let authObs: Observable<AuthResponseData>;

        // to show the Loading-Spinner Here
        // this.isLoading = true;
        // 
        if(this.isLoginMode) {
          // Through Services
            // This is for the LOGIN Functionality
            // authObs = this.authService.login(email, password);

            // Through NgRx
            // Login User
            this.store.dispatch(new AuthActions.LoginStart(
              {
                email: email,
                password: password
              }
            ))
        } else {
            // the SignUp POST Request
            // Through Services
            // authObs = this.authService.signUp(email, password);

            // Through NgRx
            // Sign Up User
            this.store.dispatch(new AuthActions.SignupStart(
              {
                email: email,
                password: password
              }
            ))
        };


        // // SUBSCRIBE the SignUp/Login POST Requets
        // authObs.subscribe( (resdata) => {
        //     console.log(resdata);
        //     this.isLoading = false;
        //     // This is the Successfull Case for SignUp/login 
        //     // we Navigate the User to the recipes page after a successfull SignUp or Login
        //     this.router.navigate(['/recipes']);

        // }, (errorMessage) => {
        //     console.log(errorMessage);
        //     this.error = errorMessage;
        //     this.isLoading = false;
        // });

        form.reset();
    }
    
    // Close the Alert-box
    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    ngOnDestroy(): void {
      if(this.storeSub) {
        this.storeSub.unsubscribe();
      }
    }

}