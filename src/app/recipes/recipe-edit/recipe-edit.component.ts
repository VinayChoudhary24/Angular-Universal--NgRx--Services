import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map, Subscription } from 'rxjs';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  // Store ID
  id: number;

  // Add a Property to show if the User is in editMode or NOT
  editMode: boolean = false;

  // For the REACTIVE Approach FORMS
  recipeForm: FormGroup;

  // Clean the Subscription
  private storeSub: Subscription;

  // INJECT ActivatedRoute to use the routes
  constructor( private route: ActivatedRoute,
               private recipeService: RecipeService,
               private router: Router, private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
    // Here we Retrieve ID and Also subscribe to react to Changes
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    }) 
  }

  // Submit eh FORM
  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],
    // );
    if(this.editMode) {
      // Update Through Service
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);

      // Update Through NgRx
      this.store.dispatch(new RecipesActions.UpdateRecipes({
        index: this.id,
        newRecipe: this.recipeForm.value
      }))
    } else {
      // Add Through Service
      // this.recipeService.addRecipe(this.recipeForm.value);

       // Add Through NgRx
       this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value))
    }
    // / This will Navigate Away
    // we Need Router
    this.onCancel();
    }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  // This will add Ingredient in the Recipe Section
    onAddIngredient() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        })
      )
    }

    // This will Navigate Away
    // we Need Router
    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.route})
    }

    // this function will delete Ingredient from the
    onDeleteIngredient(index: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
      // (<FormArray>this.recipeForm.get('ingredients')).clear();
    }

  // Reactive FORM
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    // To check if the user is in editMode or NOT
    if(this.editMode) {
      // Through Services
      const recipe = this.recipeService.getRecipe(this.id);

      // Through NgRx
      this.storeSub = this.store.select('recipes').pipe( map( recipeState => {
        return recipeState.recipes.find( (recipe, index) => {
          return index === this.id;
        })
      })).subscribe( recipe => {
        recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          )
        }
      }
      })
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    });
  }
  
  ngOnDestroy(): void {
    // Check Condition is Important
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
