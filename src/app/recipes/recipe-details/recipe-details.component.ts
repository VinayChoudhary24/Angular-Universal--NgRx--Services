import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

// This is for the TypeScript
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {


  // Add INPUT, so we can update it from Outside
  // ## After Routing we dont need Input
   recipe: Recipe;

  //  Add the ID Property Here
  id: number;

  // Inject recipeServive to Transfer the recipe From Here to Shopping List
  // INJECT ActivatedRoute to PASS the DYNAMIC PARAMETER
  // Add Router to use thr Routing functionality -- For RELATIVE PATH
  // Add ActivatedRoute to tell the -- CURRENT PATH
  constructor( private recipeService: RecipeService,
               private route: ActivatedRoute,
               private router: Router, private store: Store<fromApp.AppState> ) { }

  // there are two ways to Bind the :ID
  ngOnInit() {
    // FIRST, if we Click Only Once
    // const id = this.route.snapshot.params['id'];

    // SECOND,the Perfect way to .subscribe it to Handle CHANGES
    this.route.params.pipe(map( params => {
      return +params['id'];
    }), switchMap( id => {
      this.id = id;
      // Through NgRx
      return this.store.select('recipes');
    }), map( recipesState => {
      return recipesState.recipes.find( (recipe, index) => {
        return index === this.id;
      });
    }))
      // Now Add id in the recipe.service component
      // Now Fetch the New recipe
      // this.recipe = this.recipeService.getRecipe(this.id);
    .subscribe( recipe => {
        this.recipe = recipe;
      });
  }

  // This Function will add the Recipe in the Shopping List
  onAddToShoppingList() {
    // Through Sservices
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

    // Through NgRx
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  // This function will edit the Recipe when clicked on edit button
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  // This will call the deleteRecipe Method From recipe.services
  onDeleteRecipe() {
    // Delete Throug Service
    // this.recipeService.deleteRecipe(this.id);

    // Delete Throug ngRx
    this.store.dispatch(new RecipesActions.DeleteRecipes(this.id));
    // This will Navigate away after Delete Button Pressed
    this.router.navigate(['/recipes']);
  }

}
