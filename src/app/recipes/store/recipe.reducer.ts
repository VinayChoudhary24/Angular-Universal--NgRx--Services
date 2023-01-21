import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';

// Structure of Recipe
export interface State {
  recipes: Recipe[];
}

// initialState of Component before it is Changed
// Always a JS Object
const initialState: State = {
  recipes: []
}

// Creating reducer Function
// Always Requires Two Arguments for ngRx Package, with Default Values
//## FIRST, state -- the Current State before it was changed
// ## SECOND, action -- to Update the Component State
export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipesActions.UPDATE_RECIPE:
      // Get the updatedRecipe
      const UpdatedRecipe = { 
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe 
      };
      // Get the Entire List of Recipes
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = UpdatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter( (recipe, index) => {
          return index !== action.payload;
        })
      }

      default:
        return state;
  }
}
