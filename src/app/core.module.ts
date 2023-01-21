import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
// import { ShoppingListService } from "./shopping-list/shopping-list.service";


@NgModule({
    // ## For all the Services used in the Application
   // Providing shopping-list.service.ts will make sure All its COMPONENTS use This INSTANCE from Here
    // Add RecipeService here so that when we add a new Recipe it's not LOST after some Navigations
  providers: [
    // ShoppingListService,
    RecipeService,
    // provider for the auth-interceptor.service
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
})

export class CoreModule {}
