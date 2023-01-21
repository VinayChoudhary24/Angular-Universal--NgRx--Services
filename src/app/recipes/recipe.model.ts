// This is  How a Single Item will look Like

import { Ingredient } from "../shared/ingredients.model";

export class Recipe {
    // Add PUBLIC in front so that they are ACCESSIBLE throughout the APP
    public name: string;
    public description: string;
    public imagePath: string;

    // This will Add Ingredients to the Recipes
    public ingredients: Ingredient[];

    // Create a Contructor to Make a INSTANCE of this MODEL in FUTURE for Other Components Using NEW Keyword
    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}