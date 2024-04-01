import { CommonModule } from '@angular/common';
import { Component,NgModule, OnInit } from '@angular/core';
import{ MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryProductsService } from '../../inventory-products.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,FormsModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
Search_CateGory_data: any;
products_groups_all_data: any[];

constructor( private _inven_products_grp : InventoryProductsService){}

  ngOnInit(): void {
    this.get_grop();
  }

  get_grop(){
    this._inven_products_grp.get_groups().subscribe((res)=>{
      console.log(res.data.result)
         this.products_groups_all_data = res.data.result
    })
  }


Create_Category() {
throw new Error('Method not implemented.');
}
toggle_cat() {
throw new Error('Method not implemented.');
}
isToggle_cateGory: any;

}
