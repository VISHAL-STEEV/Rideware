import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,FormsModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
Search_CateGory_data: any;
Create_Category() {
throw new Error('Method not implemented.');
}
toggle_cat() {
throw new Error('Method not implemented.');
}
products_groups_all_data: any;
isToggle_cateGory: any;

}
