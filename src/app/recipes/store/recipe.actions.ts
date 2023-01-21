import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

// This is a Standard Naming Convention
// [Recipe] is Will Make Sure the Identifier is Unique Across the App
// This is the IDENTIFIER to Set Recipes
export const SET_RECIPES = '[Recipes] Set Recipes';

// This is the IDENTIFIER to Fetch Recipes
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';

// This is the IDENTIFIER to Add Recipes
export const ADD_RECIPE = '[Recipe] Add Recipe';

// This is the IDENTIFIER to Update Recipes
export const UPDATE_RECIPE = '[Recipe] Update Recipe';

// This is the IDENTIFIER to Delete Recipes
export const DELETE_RECIPE = '[Recipe] Delete Recipe';

// This is the IDENTIFIER to Store Recipes on Server
export const STORE_RECIPES = '[Recipes] Store Recipes';

//Describing the Action i.e Objects with type
// Action to Set/Show Recipes
export class SetRecipes implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = SET_RECIPES;

  // The Action to Attach Data
  constructor( public payload: Recipe[] ) {}
}

//Describing the Action i.e Objects with type
// Action to Fetch Recipes
export class FetchRecipes implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = FETCH_RECIPES;
}

//Describing the Action i.e Objects with type
// Action to Add Recipes
export class AddRecipe implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = ADD_RECIPE;

  // The Action to Attach Data
  constructor( public payload: Recipe ) {}
}

//Describing the Action i.e Objects with type
// Action to Update Recipes
export class UpdateRecipes implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = UPDATE_RECIPE;

  // The Action to Attach Data
  constructor( public payload: {
    index: number;
    newRecipe: Recipe;
  } ) {}
}

//Describing the Action i.e Objects with type
// Action to Delete Recipes
export class DeleteRecipes implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = DELETE_RECIPE;

  // The Action to Attach Data
  constructor( public payload: number) {}
}

//Describing the Action i.e Objects with type
// Action to Store Recipes
export class StoreRecipes implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = STORE_RECIPES;
}


// Extra Export Required for the REDUCER Parameter
// With This the Reducer can Differentiate Between Different Actions
export type RecipesActions = SetRecipes | FetchRecipes | AddRecipe | UpdateRecipes | DeleteRecipes | StoreRecipes;

