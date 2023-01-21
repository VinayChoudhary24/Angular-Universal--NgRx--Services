import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module"

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [CommonModule, FormsModule, 
        RouterModule.forChild([
         // This will Load the Login/Sign up Authentication Page
         // Path should beEmpty for LazyLoading
    { path: '', component: AuthComponent }

    ]),
    // For Loading-Spinner import SharedModule
    SharedModule,
],
    
})

export class Authmodule {}