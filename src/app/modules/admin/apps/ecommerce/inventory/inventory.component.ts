import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{ MatDialog } from '@angular/material/dialog';
import { UnitsComponent } from "./units/units.component";

@Component({
    selector: 'inventory',
    templateUrl: './inventory.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterOutlet, UnitsComponent]
})
export class InventoryComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
