import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

// Import the GLOBAL STORE
import * as fromApp from './store/app.reducer';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipeEffects } from './recipes/store/recipe.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  //## For All the Components of the Application
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  //## For all the Other Modules Requered in the Application
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    // FormsModule,

    // For Reactive Forms Approach
    // ReactiveFormsModule,

    // For HTTP Requests
    HttpClientModule,

    // For NgRx
    // .forRoot is for Defining ALL Reducers
    StoreModule.forRoot(fromApp.appReducer),

    // For NgRx Effects
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),

    // Use Store/Redux DevTools
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),

    // User NgRx Router-Store
    StoreRouterConnectingModule.forRoot(),

    // Import app-routing.module
    AppRoutingModule,

    // This is the Recipe.module
    // Loads from LazyLoading
    // RecipesModule,

    // This is the Shopping-List.Module
    // Loads from LazyLoading
    // ShoppingListModule,

    // Auth.module
    // Loads from LazyLoading
    // Authmodule,

    // Shared.module
    SharedModule,
    // core.module
    CoreModule,
  ],
  // ## For all the Services used in the Application
   // Providing shopping-list.service.ts will make sure All its COMPONENTS use This INSTANCE from Here
    // Add RecipeService here so that when we add a new Recipe it's not LOST after some Navigations
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
