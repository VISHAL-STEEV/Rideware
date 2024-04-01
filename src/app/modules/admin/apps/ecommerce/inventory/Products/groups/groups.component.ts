import { CommonModule } from '@angular/common';
import { Component,NgModule, OnInit } from '@angular/core';
import{ MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryProductsService } from '../../inventory-products.service';
import { CatPopupComponent } from 'app/PopUp/product/cat-popup/cat-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchpipePipe } from "../../../../../../../pipe/searchpipe.pipe";

@Component({
    selector: 'app-groups',
    standalone: true,
    templateUrl: './groups.component.html',
    styleUrl: './groups.component.scss',
    imports: [CommonModule, MatIconModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, SearchpipePipe]
})
export class GroupsComponent implements OnInit {
Search_CateGory_data: string;
products_groups_all_data: any[];

constructor( private _inven_products_grp : InventoryProductsService,private dialoRef : MatDialog){}




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
    this.dialoRef.open(CatPopupComponent)
    }
toggle_cat() {
throw new Error('Method not implemented.');
}
isToggle_cateGory: any;




update_Category(data:any){
  this.dialoRef.open(CatPopupComponent,{data})
}


}
