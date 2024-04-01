import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { InventoryProductsService } from '../../inventory-products.service';
import { PriceListPoPUpComponent } from 'app/PopUp/product/price-list-po-pup/price-list-po-pup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchpipePipe } from "../../../../../../../pipe/searchpipe.pipe";


@Component({
    selector: 'app-price-list',
    standalone: true,
    templateUrl: './price-list.component.html',
    styleUrl: './price-list.component.scss',
    imports: [CommonModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, SearchpipePipe]
})
export class PriceListComponent implements OnInit {
  Search_CateGory_data: string;
products_groups_all_data: any[];
isToggle_cateGory: any;

constructor(private _inven_products_grp :InventoryProductsService ,private popUp:MatDialog){}

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
this.popUp.open(PriceListPoPUpComponent)
}
toggle_cat() {

}

update_Category(data:any){
  this.popUp.open(PriceListPoPUpComponent,{data})
}




}
