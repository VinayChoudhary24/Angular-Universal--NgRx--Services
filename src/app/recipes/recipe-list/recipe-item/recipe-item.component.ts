import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // Add a Property recipe i.e Not a Array but Just a Single Recipe
  @Input() recipe: Recipe;

  // Add this property to Load the Different Recipes by Click
  @Input() index: number;

  // // Property for Recipe Selected
  // @Output() recipeSelected = new EventEmitter<void>();

  // Inject RecipeService to use the PROPERTY to Transfer DATA
  // ## After Routin we dont need this
  // constructor( private recipeService: RecipeService ) { }

  ngOnInit(): void {
  }



  // // Function that will Select a Particular Recipe
  // // ## After Routin we dont need this
  // onSelected() {
  //   // call a Method to Transfer the Data
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

}
