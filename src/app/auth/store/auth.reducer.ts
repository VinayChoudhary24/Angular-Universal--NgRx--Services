import { User } from "../user.model";

// Access all Actions
import * as AuthActions from './auth.actions';

// General Interface for Actions
export interface State {
  user: User;
  // LoginFail errorMSG
  authError: string;
  // The Loading Spinner
  loading: boolean;
}

// initialState of Component before it is Changed
// Always a JS Object
const initialState: State = {
  user: null,
  // LoginFail errorMSG
  authError: null,
  loading: false,
}

// Creating reducer Function
// Always Requires Two Arguments for ngRx Package, with Default Values
//## FIRST, state -- the Current State before it was changed
// ## SECOND, action -- to Update the Component State
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  // Action to Update the State
  // Switch Case for Multiple ActionsTypes
  switch (action.type) {
     // LOGIN is Identifier
    // Login the User
    case AuthActions.AUTHENTICATE_SUCCESS:
      // Create a New User
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        // When login Successful
        authError: null,
        user: user,
        loading: false
      };

       // LOGOUT is Identifier
    // Logout the User
    case AuthActions.LOGOUT:
      // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        user: null
      };

      // LOGIN_START and SIGNUP_START is Identifier
      // start the Login and Signup process
      case AuthActions.LOGIN_START:
      case AuthActions.SIGNUP_START:
         // Update Immutably i.e Copy Old state with SPREAD operator and Update
        return {
          ...state,
          authError: null,
          loading: true,
        }

         // LOGIN_FAIL is Identifier
      // start the Login process
      case AuthActions.AUTHENTICATE_FAIL:
        // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }

      // Clear Error
      case AuthActions.CLEAR_ERROR:
        // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        authError: null,
      }

      // EXTREMELY IMPORTANT DEFAULT CASE
      // This Handles the Actions Not Present in This Reducer i.e If a Action is Dispatched from Shopping List not Related to Auth, This Default Case is Initialized to Maintain the AppState.
      default:
        return state;
  }
}
