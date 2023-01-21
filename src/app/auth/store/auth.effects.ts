
// This Action is Different from the Store Actions
import { HttpClient } from '@angular/common/http';
import { Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

// Access all Actions
import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';

// Access the Firebase API-Key
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

// This is the Response that we will get from FIREBASE after the SignUp/Login Request
// The Response Data for SignUp and Login is almost same, with the ONLY difference is the REGISTERED key which is the response for the Login
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  // Add a ? with this key i.e making it Optional because it's present in Login and Not in SignUp ResponseData
  registered?: boolean;
}

// Function For Authentication for Sign Up and Login
const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

  // Create a User To Store the Data in LocalStorage
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

          //Return Observable
          // Create Object
          return new AuthActions.AuthenticateSuccess(
            {
              email: email,
              userId: userId,
              token: token,
              expirationDate: expirationDate,
              redirect: true
            }
          );
};

// Function For Error Handling for Sign Up and Login
const handleError = (errorRes: any) => {
  let errorMessage = 'An Unknown error occured!';
  if(!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.AuthenticateFail(errorMessage));
  }
   // For Different Types of errors we Use Switch Case
   switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already in use by another account.';
          break;
      case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.'
          break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
      case 'EMAIL_NOT_FOUND':
            errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
            break;
      case 'INVALID_PASSWORD':
            errorMessage = 'The password is Invalid.'
            break;
      case 'USER_DISABLED':
            errorMessage = ' The user account has been disabled by an administrator.';
            break;       
  }
//Return Observable
return of(new AuthActions.AuthenticateFail(errorMessage));
};


// Add Injectable so that Actions can be Injected
@Injectable()
export class AuthEffects {
   // Sign-Up Effect Handler
  // We Dont need to Subscribe i.e NgRx will Subscribe for us.
  // Attach Decorator @Effect() to Make it a Effect and Inform NgRx about Effects
  // @Effect()
  authSignup = this.actions$.pipe(
    // ofType Operator Allows us to Filter Effects
     // 'ofType' filters an Observable of Actions into an observable of the actions whose type strings are passed to it.
    ofType(AuthActions.SIGNUP_START),
    // switchMap Operator Allows us to Create new Observable by Taking Data from Another Observable
    switchMap( (signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
        }
      ).pipe(
        tap( resData => {
          this.authService.autoLogout(+resData.expiresIn * 1000);
        }),
        map( resData => {
          // call Auth Handler
          return handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        } ),
        catchError( errorRes => {
          return handleError(errorRes);
      } )
     )
    })
  )

  // Login Effect Handler
  // We Dont need to Subscribe i.e NgRx will Subscribe for us.
  // Attach Decorator @Effect() to Make it a Effect and Inform NgRx about Effects
  // @Effect()
  authLogin = this.actions$.pipe(
    // ofType Operator Allows us to Filter Effects
     // 'ofType' filters an Observable of Actions into an observable of the actions whose type strings are passed to it.
    ofType(AuthActions.LOGIN_START),
    // switchMap Operator Allows us to Create new Observable by Taking Data from Another Observable
    switchMap( (authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
        }
      ).pipe(
        tap( resData => {
          this.authService.autoLogout(+resData.expiresIn * 1000);
        }),
        map( resData => {
          // call Auth Handler
          return handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        } ),
        catchError( errorRes => {
          return handleError(errorRes);
      } )
     )
    }),
    // Return a Action #Very important
  );

  // To NAvigate
  // ofType Operator Allows us to Filter Effects
     // 'ofType' filters an Observable of Actions into an observable of the actions whose type strings are passed to it.
  // @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), tap( 
    (authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if(authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    }
  ));

  // Auto Login User
  // @Effect()
  autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map( () => {
    // Get data from localStorage
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
  } = JSON.parse(localStorage.getItem('userData'));
  if(!userData) {
    // IMPORTANT
      return { type: 'DUMMY' };
  }
  // Create a User
  const loadedUser = new User(
      userData.email, 
      userData.id, 
      userData._token,
      // Convert it into a Date Format 
      new Date(userData._tokenExpirationDate));

  // Check if the User has a Valid Token
  if(loadedUser.token) {
    // Changing user State Through RxJS i.e Service [Subject, Observables ...]
      // this.user.next(loadedUser);

      // calling the AutoLogout method
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.authService.autoLogout(expirationDuration);

      // Changing User State Through NgRx
      return new AuthActions.AuthenticateSuccess(
        {
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        }
      );
    }
     // IMPORTANT
    return { type: 'DUMMY' }; 
  }))

  // Clear the LocalStorage Data When User Logout
  // @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap( () => {
    this.authService.clearLogoutTimer();
     // Clear the Snapshot after logout i.e user data from loaclStorage
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
  }))


  // This Action will give a Observable to react over these effects
  constructor( private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService ) {}
}
function Effect() {
  throw new Error('Function not implemented.');
}

