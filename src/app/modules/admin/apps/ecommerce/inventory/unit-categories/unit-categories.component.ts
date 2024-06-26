import { Component,NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { InventoryService } from '../inventory.service';
import { tick } from '@angular/core/testing';
import{ MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CateGoryPopUpComponent } from 'app/PopUp/cate-gory-pop-up/cate-gory-pop-up.component';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchpipePipe } from "../../../../../../pipe/searchpipe.pipe";

@Component({
    selector: 'app-unit-categories',
    standalone: true,
    templateUrl: './unit-categories.component.html',
    styleUrl: './unit-categories.component.scss',
    imports: [CommonModule, MatIconModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, SearchpipePipe]
})
export class UnitCategoriesComponent implements OnInit {
createProduct() {
throw new Error('Method not implemented.');
}

category_data:any[]=[];
unit: any;
Search_CateGory_data: string;
isToggle_cateGory: boolean = false;
Click_EventSub:Subscription;
pageSize = 10; // Set your desired page size
pageSizeOptions = [5, 10, 25, 100]; // Define your page size options



constructor(private _inventrySercice :InventoryService,private popup :MatDialog){
  this.Click_EventSub =this._inventrySercice.getEvent().subscribe((res)=>{
    this.display_units();
    
})
}

ngOnInit(): void {

 this.display_units();

}


display_units(){
  this._inventrySercice.get_units().subscribe((res)=>{
    this.category_data = res.data.result;
})
}

as_cateGory(){
  this.category_data = this.category_data.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
  });

}

ds_cateGory(){
  this.category_data = this.category_data.sort((a: any, b: any) => {
      return b.name.localeCompare(a.name);
  });

}

toggle_cat() {
  this.isToggle_cateGory = !this.isToggle_cateGory;
  if (this.isToggle_cateGory) {
      this.as_cateGory();
    
  } else {
      this.ds_cateGory();
     
  }
}




Create_Category() {
  this.popup.open(CateGoryPopUpComponent)
  }


update_Category(data: any) {
  const Id = data.id;
  const Name = data.name
  
this.popup.open(CateGoryPopUpComponent ,{
  data: {
        id :Id,
        name :Name
      }
})
}

      
// Method to handle page change event
pageChanged(event: any) {
  // You can fetch data for the new page here based on event.pageIndex and event.pageSize
}


}
