import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            // this goes to the shopping-list section i.e /shopping-list
            // Path should beEmpty for LazyLoading
            { path: '', component: ShoppingListComponent },

        ]),
        SharedModule,
    ],
})

export class ShoppingListModule {}