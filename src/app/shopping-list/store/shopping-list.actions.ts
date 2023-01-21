// All Different ActionsTypes defined Here
import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredients.model';

// This is a Standard Naming Convention
// [Shopping List] is Will Make Sure the Identifier is Unique Across the App
// This is the IDENTIFIER to Add a Ingredient in Shopping-List
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';

// This is the IDENTIFIER to Add Ingredients from recipe-list to Shopping-list
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';

// This is the IDENTIFIER to Update Ingredients in Shopping-list
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';

// This is the IDENTIFIER to Delete Ingredients in Shopping-list
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';

// To Start the Editing in Shopping-List
export const START_EDIT = '[Shopping List] Start Edit';

// To Stop the Editing in Shopping-List
export const STOP_EDIT = '[Shopping List] Stop Edit';

//Describing the Action i.e Objects with type
// Action to Add a Ingredient
export class AddIngredient implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = ADD_INGREDIENT;

  // The Action to Attach Data
  constructor( public payload: Ingredient ) {}
}

//Describing the Action i.e Objects with type
// Action to Add a Ingredients from recipe-list to Shopping-list
export class AddIngredients implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = ADD_INGREDIENTS;

  // The Action to Attach Data
  constructor( public payload: Ingredient[] ) {}
}

//Describing the Action i.e Objects with type
// Action to Update a Ingredients Inside Shopping-list
export class UpdateIngredient implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = UPDATE_INGREDIENT;

  // The Action to Attach Data
  constructor( public payload: Ingredient ) {}
}

//Describing the Action i.e Objects with type
// Action to Delete a Ingredients in Shopping-list
export class DeleteIngredient implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = DELETE_INGREDIENT;
}

//Describing the Action i.e Objects with type
// Action to start the Editing Ingredients in Shopping-list
export class StartEdit implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = START_EDIT;

  // The Action to Attach Data
  constructor( public payload: number ) {}
}

//Describing the Action i.e Objects with type
// Action to stop the Editing Ingredients in Shopping-list
export class StopEdit implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = STOP_EDIT;
}

// Extra Export Required for the REDUCER Parameter
// With This the Reducer can Differentiate Between Different Actions
export type ShoppingListActions = AddIngredient |
                                  AddIngredients |
                                  UpdateIngredient |
                                  DeleteIngredient |
                                  StartEdit |
                                  StopEdit;

