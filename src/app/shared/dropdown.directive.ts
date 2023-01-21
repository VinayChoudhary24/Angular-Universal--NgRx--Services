// CREATING A CUSTOM DROPDOWN To MANAGE DROPDOWN IN THE HEADER AND RECIPE SECTION 

import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    // Bind the Class of the Element
    // OPEN is the bootstrap Class which Open-ups the Dropdown ARROW
    @HostBinding('class.open') isOpen: boolean = false;

    // It Should Toggle the DropDown
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;;
    }

    constructor(private elRef: ElementRef) {}
}