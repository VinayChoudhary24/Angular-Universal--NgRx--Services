import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert-component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {

    // use Input to attach string interpolation  
    @Input() message: string;

    // Add Output to make an Event Listenable from outside
    // This will Close the Dynamic alert-error-component
    @Output() close = new EventEmitter<void>();

    // Method to Emit when click the close button, when showing alert error
    onClose() {
        this.close.emit();
    }

}