// To Avoid Unneccessary Bugs while Loading the Page for the First time without any Saved and Fetched Data

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { DataStorageService } from "../shared/Http-data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";
import { map, of, switchMap, take } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor( private dataStorageService: DataStorageService,
                private recipesService: RecipeService, 
                private store: Store<fromApp.AppState>, private actions$: Actions ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // To Hold Recipes State --VERY IMPORTANT
      return this.store.select('recipes').pipe(take(1),
        map( recipesState => {
        return recipesState.recipes;
      } ), switchMap( recipes => {
        if(recipes.length === 0) {
           // Through NgRx
           this.store.dispatch(new RecipesActions.FetchRecipes());
           return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      }))
        // } else {
            // return recipes;
        // }
    }
}