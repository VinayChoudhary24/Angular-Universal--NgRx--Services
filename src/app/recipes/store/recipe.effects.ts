import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, EffectSources, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

// Add Injectable so that Actions can be Injected
@Injectable()
export class RecipeEffects {
  // This Will Fetch the Recipes
  // We Dont need to Subscribe i.e NgRx will Subscribe for us.
  // Attach Decorator @Effect() to Make it a Effect and Inform NgRx about Effects
  // @Effect() 
  fetchRecipes = this.actions$.pipe(
    // ofType Operator Allows us to Filter Effects
     // 'ofType' filters an Observable of Actions into an observable of the actions whose type strings are passed to it.
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap( () => {
      return this.http.get<Recipe[]>('https://online-food-order-app-40d46-default-rtdb.firebaseio.com/recipes.json',
      // {
          // Attach the Token to the Request
          // params: new HttpParams().set('auth', user.token)
      // }
      )
    }),
    // Add Operator to Make sure we always fetch in a FORMAT i.e recipes with Ingredients[] Array
        // This map is the RxJS Operator Map used with PIPE()
        map( (recipes) => {
          // This is the Normal JS map Function
          return recipes.map( (recipe) => {
              return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          });
      }),
      map( recipes => {
        return new RecipesActions.SetRecipes(recipes);
      } )
  );

  // Store Recipes on Server Firebase
  // @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    // Get the Recipes From data-Storage
    withLatestFrom(this.store.select('recipes')), 
    switchMap( ([actionData, recipesState]) => {
      // Use PUT request to Store all data and at the Same time Replace the Existing data i.e UPDATE
      return this.http.put('https://online-food-order-app-40d46-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes)
    })
  )

  constructor( private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState> ) {}
}