import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-requisition-history',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,FormsModule],
  templateUrl: './requisition-history.component.html',
  styleUrl: './requisition-history.component.scss'
})
export class RequisitionHistoryComponent {
Search_CateGory_data: any;
Create_Category() {
throw new Error('Method not implemented.');
}
isToggle_cateGory: any;
toggle_cat() {
throw new Error('Method not implemented.');
}
products_groups_all_data: any;

}
