import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { InventoryProductsService } from '../../inventory-products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
Search_CateGory_data: any;
products_groups_all_data: any[];

constructor(private _inven_products_grp:InventoryProductsService ){}
  ngOnInit(): void {
    this.get_product()
  }

  get_product(){
    this._inven_products_grp.get_products().subscribe((res)=>{
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
