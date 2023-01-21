// This File Contains all the Routes of the Application

import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// This variable contains all the routes
const appRoutes: Routes = [
    // We Need a Empty path for the Home Page
    // Add pathMatch: 'full' property to the Empty Path Always, so that it redirects without errors
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },

    // This is the Place to Register LazyLoading for recipes.module, LL Helps pages load Faster and Loads only Required Contents
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesModule) },

     // This is the Place to Register LazyLoading for shopping-list.module, LL Helps pages load Faster and Loads only Required Contents
     { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then( m => m.ShoppingListModule) },

     // This is the Place to Register LazyLoading for auth.module, LL Helps pages load Faster and Loads only Required Contents
     { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.Authmodule) }

];

// Add NgModule to transform the TypeScript class into a Angular Module
@NgModule({
    // Configure the Router
    //## preloadingStrategy:- it is Used to Pre-Load the LazyLoading Code
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})

export class AppRoutingModule {}