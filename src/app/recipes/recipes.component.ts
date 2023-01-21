import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],

  // Providing recipe.service.ts will make sure All its COMPONENTS use This INSTANCE from Here
  // Providing the recipe.service Here and Add it into the Constructor Below
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  constructor( 
    // private recipeService: RecipeService
     ) { }

  // To Display the Recipe When we Click On IT.. i.e  Without Using the Compplex EVENT & PROPERTY BINDING
  ngOnInit() {
    // this.recipeService.recipeSelected
    // // SET-UP A LISTENER HERE i.e SUBSCRIBE
    // // subscribe it to LISTEN the RecipeService
    // .subscribe( (recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // }); 
  }

}
