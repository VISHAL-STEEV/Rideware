import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { InventoryProductsService } from '../../inventory-products.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupPopUpComponent } from 'app/PopUp/product/group-pop-up/group-pop-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchpipePipe } from "../../../../../../../pipe/searchpipe.pipe";

@Component({
    selector: 'app-categories',
    standalone: true,
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss',
    imports: [CommonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, FormsModule, SearchpipePipe]
})
export class CategoriesComponent implements OnInit{

products_groups_all_data: any[];
Search_CateGory_data:string;
constructor(private _inven_products_grp :InventoryProductsService ,  private dialoRef : MatDialog){}
ngOnInit(): void {
  this.get_Cat();
}



get_Cat(){
  this._inven_products_grp.get_Categories().subscribe((res)=>{
       this.products_groups_all_data = res.data.result
  });
}

Create_Category() {
this.dialoRef.open(GroupPopUpComponent)
}
isToggle_cateGory: any;
toggle_cat() {
throw new Error('Method not implemented.');
}
update_Category(data:any){
  this.dialoRef.open(GroupPopUpComponent,{data} )
}

}
