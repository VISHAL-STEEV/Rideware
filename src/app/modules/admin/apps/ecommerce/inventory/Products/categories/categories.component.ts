import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { InventoryProductsService } from '../../inventory-products.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
Search_CateGory_data: any;
products_groups_all_data: any[];

constructor(private _inven_products_grp :InventoryProductsService ){}
ngOnInit(): void {
  this.get_Cat();
}



get_Cat(){
  this._inven_products_grp.get_Categories().subscribe((res)=>{
    console.log(res.data.result)
       this.products_groups_all_data = res.data.result
  })
}

Create_Category() {
throw new Error('Method not implemented.');
}
isToggle_cateGory: any;
toggle_cat() {
throw new Error('Method not implemented.');
}


}
