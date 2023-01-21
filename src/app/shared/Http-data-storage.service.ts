import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

// Add Injectable to add Other Services and Providers Array
@Injectable({
    providedIn: 'root'
})

export class DataStorageService {

    // This property uses the HttpClientModule in this Service
    constructor( private http: HttpClient,
        // to Access all the Recipes in this Servies i.e to Store and Fetch them
                private recipeService: RecipeService,
                // Inject AuthService to Attach Token to Every Outgoing Requets
                private authService: AuthService, private store: Store<fromApp.AppState> ) {}

    //To Store all the Recipes from the RecipeList Section to the FIREBASE Database...
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        // Use PUT request to Store all data and at the Same time Replace the Existing data i.e UPDATE
        this.http.put('https://online-food-order-app-40d46-default-rtdb.firebaseio.com/recipes.json', recipes)
        // To send a HttpRequest we need to SUBSCRIBE always
        .subscribe( (response) => {
            console.log(response);
        })
    }

    // To Fetch the Stored recipes from the FIREBASE Database
    fetchRecipes() {
        // To ATTACH token for Outgoing Requests
        // We use TAKE Operator to GET the user Once and not with every Request
        // we use exhaustMap Operator to Connect to OBSERVABLES i.e PIPE two Observables
        // return this.authService.user.pipe(take(1),
        // exhaustMap( (user) => {
            return this.http.get<Recipe[]>('https://online-food-order-app-40d46-default-rtdb.firebaseio.com/recipes.json',
            // {
                // Attach the Token to the Request
                // params: new HttpParams().set('auth', user.token)
            // }
            ).pipe(
        // }),
        // Add Operator to Make sure we always fetch in a FORMAT i.e recipes with Ingredients[] Array
        // This map is the RxJS Operator Map used with PIPE()
        map( (recipes) => {
            // This is the Normal JS map Function
            return recipes.map( (recipe) => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            });
        }),
        // Tap method is Used here for the ResolverService
        tap( (recipes) => {
          // hSetting Recipes Through Services
            // this.recipeService.setRecipes(recipes);

          // Through ngRx
            this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
        );
    }

}
