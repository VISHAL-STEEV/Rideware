import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';





export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  see : string;
  daee : string;
  hello : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',see : 'hello',daee : 'string',hello : "string"},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',see : 'hei',daee : 'string',hello : "string"},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',see : 'hei',daee : 'string',hello : "string"},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',see : 'hei',daee : 'string',hello : "string"},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',see : 'hei',daee : 'string',hello : "string"},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',see : 'hei',daee : 'string',hello : "string"},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',see : 'hei',daee : 'string',hello : "string"},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',see : 'hei',daee : 'string',hello : "string"},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',see : 'hei',daee : 'string',hello : "string"},
  
];



@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,FormsModule,
   MatSelectModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatTableModule],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent {



  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  selected = 'option2';
  taxableAmount: number = 0;
  taxAmount: number = 0;
  totalAmount: number = 0;

  save() {
    // Handle save functionality
  }

  goBack() {
    // Handle navigation back to list page
  }

}
