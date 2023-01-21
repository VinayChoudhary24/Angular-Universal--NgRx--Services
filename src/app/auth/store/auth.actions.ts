import { Action } from "@ngrx/store";

// // This is the IDENTIFIER for Sign-Up Http Request
export const SIGNUP_START = '[Auth] Signup Start';

// // This is the IDENTIFIER for Successfull Http Request
export const LOGIN_START = '[Auth] Login Start';

// // This is the IDENTIFIER for Http Request
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';

// This is a Standard Naming Convention
// [Auth] is Will Make Sure the Identifier is Unique Across the App
// This is the IDENTIFIER for user login
export const AUTHENTICATE_SUCCESS = '[Auth] Login';

// This is the IDENTIFIER for user logout
export const LOGOUT = '[Auth] Logout';

// This is the IDENTIFIER for error in component
export const CLEAR_ERROR = '[Auth] Clear Error';

// This is the IDENTIFIER for Auto Login
export const AUTO_LOGIN = '[Auth] Auto Login';

//Describing the Action i.e Objects with type
// USer Login Action
export class AuthenticateSuccess implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = AUTHENTICATE_SUCCESS;

  // The Action to Attach Data
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: Boolean;
    }
    ) {}
}

//Describing the Action i.e Objects with type
// USer LogOut Action
export class Logout implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = LOGOUT;
}

//Describing the Action i.e Objects with type
// USer Login Start i.e Http Request
export class LoginStart implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = LOGIN_START;

  // The Action to Attach Data
  constructor( public payload: {
    email: string;
    password: string;
  } ) {}
}

//Describing the Action i.e Objects with type
// USer Login Fail i.e Http Request
export class AuthenticateFail implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = AUTHENTICATE_FAIL;

  // The Action to Attach Data
  constructor( public payload: string ) {}
}

//Describing the Action i.e Objects with type
// USer Sign Up i.e Http Request
export class SignupStart implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = SIGNUP_START;

  // The Action to Attach Data
  constructor( public payload: {
      email: string;
      password: string;
  } ) {}
}

//Describing the Action i.e Objects with type
// clear Error 
export class ClearError implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = CLEAR_ERROR;
}


//Describing the Action i.e Objects with type
//Store the UserData in LocalStorage and Keeps the User in Login Mode  
export class AutoLogin implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = AUTO_LOGIN;
}


// Extra Export Required for the REDUCER Parameter
// With This the Reducer can Differentiate Between Different Actions
// Make Unions of Classes
export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | ClearError | AutoLogin;
