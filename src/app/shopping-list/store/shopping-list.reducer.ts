// NgRx - Redux reducers
import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredients.model';

// Import EVERYTHING as ALIAS from Action File
import * as ShoppingListActions from './shopping-list.actions';

// General Interface for Actions
export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number,
}

// initialState of Component before it is Changed
// Always a JS Object
const initialState: State = {
  ingredients: [
    // Here we Create the INSTANCE/BLUEPRINT of the ingredient.model class/Object with the 'new' Keyword
    new Ingredient('Apples', 13),
    new Ingredient('tomato', 13),
  ],
  // To Start the Editing in shopping-List
  editedIngredient: null,
  editedIngredientIndex: -1
};

// Creating reducer Function
// Always Requires Two Arguments for ngRx Package, with Default Values
//## FIRST, state -- the Current State before it was changed
// ## SECOND, action -- to Update the Component State
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  // Action to Update the State
  // Switch Case for Multiple ActionsTypes
  switch (action.type) {

    // ADD_INGREDIENT is Identifier
    // Adding a ingredient in Shopping-List
    case ShoppingListActions.ADD_INGREDIENT:
    // Update Immutably i.e Copy Old state with SPREAD operator and Update
    return {
      ...state,
      ingredients: [...state.ingredients, action.payload]
    };

    // ADD_INGREDIENTS is Identifier
    // Adding Ingredients from Recipe-Area to Shopping-List
    case ShoppingListActions.ADD_INGREDIENTS:
      // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    // UPDATE_INGREDIENT is Identifier
    // Update Ingredient Inside Shopping-List
    case ShoppingListActions.UPDATE_INGREDIENT:
      // Update Immutably i.e Copy Old state with SPREAD operator and Update

      // Getting the Ingredient
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // Update the Ingredient value i.e new
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      // Getting the value of Ingredient to Update i.e previous value
      const updatedIngredients = [...state.ingredients];
      // Replace the Previous Value with the New Value
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    // DELETE_INGREDIENT is Identifier
    // Delete Ingredient Inside Shopping-List
    case ShoppingListActions.DELETE_INGREDIENT:
      // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        ingredients: state.ingredients.filter( (ingredient, ingredientIndex) => {
          return ingredientIndex !== state.editedIngredientIndex;
        } ),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

      // START_EDIT is Identifier
    // start editing a Ingredient Inside Shopping-List
    case ShoppingListActions.START_EDIT:
      // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        editedIngredientIndex: action.payload,
        // This is Important
        editedIngredient: { ...state.ingredients[action.payload] }
      };

      // STOP_EDIT is Identifier
    // stop editing a Ingredient Inside Shopping-List
    case ShoppingListActions.STOP_EDIT:
      // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

      // EXTREMELY IMPORTANT DEFAULT CASE
      // This Handles the Actions Not Present in This Reducer i.e If a Action is Dispatched from Auth not Related to Shopping List, This Default Case is Initialized to Maintain the AppState.
    default:
    return state;
  }
}
