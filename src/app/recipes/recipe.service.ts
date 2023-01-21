// This Service is to Manage the Recipes

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
// import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

// import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe.model";

// Access all the Actions
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

// To Get the Shopping List State from Global Store
// Standard Naming Convention
import * as fromApp from '../store/app.reducer';

// Use @Injectable to Access/Inject the Shopping List Service Here
@Injectable()

// Providing the recipe.service in recipes.component.ts and Add it into the Constructor of the Component where we want to Use it
export class RecipeService {

    // Add Subject Emit event rather than EvventEmitter -- to all the Services Files
    // recipeSelected = new Subject<Recipe>()

  // After Adding Observables we Dont need this -- to all the Services Files
    // Add a Property to transfer the Data
    // recipeSelected = new EventEmitter<Recipe>()

    // Add this Property to Add/Update a New Recipe to the List of Recipes
    recipesChanged = new Subject<Recipe[]>();

     // This Array Contains all the Recipes i.e Recipe MODEL
    //  Make it PRIVATE so that no-one can Access this Service from Outside
  private recipes: Recipe[] = [
    // Here we Create the INSTANCE/BLUEPRINT of the recipe.model class/Object with the 'new' Keyword
    new Recipe('BEEF TACOS',
    'The most flavorful and juiciest taco meat EVER!!',
    'https://houseofyumm.com/wp-content/uploads/2021/06/Taco-Meat-8-680x520.jpg',
    [
        // USING THE INGREDIENT CONSTRUCTOR
        new Ingredient('Corn Tortillas', 4),
        new Ingredient('Mint Lime', 2)
    ]),

    new Recipe('GARLICKY SPAGHETTI',
    ' If you are a major garlic fan!!',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/garlic-spaghetti-horizontal-1539203011.jpg',
    [
        new Ingredient('Bread Crumbs', 2),
        new Ingredient('White Wine', 2)
    ]),

    new Recipe('CHEESY MEATBALL PIZZA RING',
    'You’ve officially fallen off the deep end into pizza bliss!!',
    'https://www.cookedperfect.com/wp-content/uploads/sites/239/2016/06/cooked-perfect-recipe-cheesy-meatball-pizza-2.jpg',
    [
        new Ingredient('Meatballs', 15),
        new Ingredient('Iced tea', 2)
    ]),

    new Recipe('CHICKEN JUICY BURGER',
    'Big Bad Boy Burger!!',
    'https://www.getflavor.com/wp-content/uploads/2022/07/4-Ways-to-Build-Crave-in-Fried-Chicken-Sandwiches-Featured.png',
    [
        new Ingredient('Chicken Breast', 2),
        new Ingredient('Fresh Lime Soda', 2)
    ]),

    new Recipe('Crispy Chinese Chicken Wings',
    'Bring this dish to the party!!',
    'https://iheartumami.com/wp-content/uploads/2018/12/Whole30-Crispy-Chinese-Chicken-Wings-Oven-Baked-Paleo-Keto-Chicken-Wings-I-Heart-Umami-4.jpg',
    [
        new Ingredient('Chicken Wings', 6),
        new Ingredient('Blue Lagoon Moacktail', 2)
    ]),

    new Recipe('Hyderabadi Chicken Biryani',
    'The most popular biryani is Here!!',
    'https://c.ndtvimg.com/2022-07/g1sfm4pg_biryani_625x300_07_July_22.png',
    [
        new Ingredient('Meat', 2),
        new Ingredient('Coke', 2)
    ]),
  ];
                    // OR
  // private recipes: Recipe[] = [];

//   Add Constructor to Use the Shopping List Service
// private slService: ShoppingListService, 
// private store: Store<{ shoppingList: { ingredients: Ingredient[] }}> for Single
constructor( private store: Store<fromApp.AppState> ) {}

// This will Update the RecipesList Section when we Fetch from Database i.e Click fetch Data
setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    // To update All places that we changed the Recipes
    this.recipesChanged.next(this.recipes.slice());
}

//   A Method to get the Service from Outside
    getRecipes() {
        // Use SLICE() so that it will Return the Exact Copy of this recipes ARRAY
        return this.recipes.slice();
    }

    // ## This Method will take the ID/Index and Load the recipe-detail component
    getRecipe(index: number) {
        return this.recipes[index];
    }

    // Method to get the INGRDIENTS
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      // Adding Ingredient Through Services
        // Here we Need to get Access to the Shopping List Service so Now we Inject a Service into Another Service i.e @Injectable
        // this.slService.addIngredients(ingredients);

        // Adding Ingredient Through NgRx
        // Dispatch the Actions
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    // This Method will Add a NEW RECIPE in the recipe Section
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        // to Add/Update a New Recipe to the List of Recipes
        this.recipesChanged.next(this.recipes.slice())
    }

    // This Method will UPDATE a EXISTING Recipe in the recipe Section
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        // to Add/Update a New Recipe to the List of Recipes
        this.recipesChanged.next(this.recipes.slice());
    }

    // deleting a recipe from the recipe List
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        // to Add/Update a New Recipe to the List of Recipes
        this.recipesChanged.next(this.recipes.slice());
    }

}
