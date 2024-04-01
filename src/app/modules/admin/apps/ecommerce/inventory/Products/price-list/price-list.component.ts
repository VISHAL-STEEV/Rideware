import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { InventoryProductsService } from '../../inventory-products.service';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,FormsModule],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss'
})
export class PriceListComponent implements OnInit {
Search_CateGory_data: any;
products_groups_all_data: any[];
isToggle_cateGory: any;

constructor(private _inven_products_grp :InventoryProductsService){}

  ngOnInit(): void {
    this.get_priceList();
  }

  get_priceList(){
    this._inven_products_grp.get_priceList().subscribe((res)=>{
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



}
