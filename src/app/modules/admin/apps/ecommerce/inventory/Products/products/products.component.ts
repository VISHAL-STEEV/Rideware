import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { InventoryProductsService } from '../../inventory-products.service';
import { Router ,NavigationExtras} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchpipePipe } from "../../../../../../../pipe/searchpipe.pipe";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    imports: [CommonModule, MatIconModule, MatButtonModule,MatPaginatorModule, MatInputModule,
        MatFormFieldModule, FormsModule, SearchpipePipe]
})
export class ProductsComponent implements OnInit{
Search_CateGory_data: string;
products_groups_all_data: any[]=[];
pageSize = 10; // Set your desired page size
pageSizeOptions = [5, 10, 25, 100];
products:any[]=[];

constructor(private _inven_products_grp:InventoryProductsService,private route : Router){}
  ngOnInit(): void {
    this.get_product()
  }

  get_product(){
    this._inven_products_grp.get_products().subscribe((res)=>{
      console.log(res.data.result)
         this.products_groups_all_data = res.data.result;
         this.products = this.products_groups_all_data.slice(0, this.pageSize);
    })
  }


Create_Category() {
 this.route.navigate(['inventory/product/Create_and_upadate']);

}


isToggle_cateGory: any;
toggle_cat() {
throw new Error('Method not implemented.');
}

update_Category(data:any){
  this.route.navigate(['inventory/product/Create_and_upadate',data.id]);
}


 // Method to handle page change event
 pageChanged(event: any) {
  // You can fetch data for the new page here based on event.pageIndex and event.pageSize

   // Calculate the starting index of the displayed items
const startIndex = event.pageIndex * event.pageSize;
// Slice the array to get the items for the current page
this.products = this.products_groups_all_data.slice(startIndex, startIndex + event.pageSize);


}


}



