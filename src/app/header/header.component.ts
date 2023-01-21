import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/Http-data-storage.service";

// 
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    // To store the user State to Unsubscribe()
    private userSub: Subscription;

    // To Check is the User is LoggedIn or NOT
    isAuthenticated = false;

    // To access the Http Request 
    constructor( private dataStorageService: DataStorageService,
        // To TRACk the STATE of the User  
        private authService: AuthService, private store: Store<fromApp.AppState> ) {}

        // To Initialize the User State when page Loads
        ngOnInit(): void {
            // this.userSub = this.authService.user.subscribe( (user) => {

            // Through NgRx
            // Use .select method to get the Slice of the State
            this.userSub = this.store.select('auth').pipe(map( authState => authState.user )).subscribe( (user) => {

                this.isAuthenticated = !user ? false : true;
                // this.isAuthenticated = !!user;
                // We can also replace this !user ? false : true; with !!user
                console.log(!user);
                // console.log(!!user)
            });
        }

    // add a Property
    // Create a Variable that will be LISTENED(@Output) by other Components, and EMIT the FEATURES
    // After routing we dont need this
    // @Output() featureSelected = new EventEmitter<string>();



    // This function will Fire the LINKS in the HEADER Section
    // After routing we dont need this
    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    // Store the Recipes to the Database by Click Save
    onSaveData() {
      // Save Through Service
        // this.dataStorageService.storeRecipes();

      // Save Through NgRx
      this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    // Fetch the Recipes from the Database
    onFetchData() {
      // Fetching Through Services
        // this.dataStorageService.fetchRecipes().subscribe();

      // Fetching Through NgRx
      this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    // logout the user by Click
    onLogout() {
      // Logout Through Service
        // this.authService.logout();

      // Logout Through NgRx
      this.store.dispatch(new AuthActions.Logout());
    }

    // Unsubscribe the State of the User
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}