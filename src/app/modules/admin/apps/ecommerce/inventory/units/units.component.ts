import { Component , NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchpipePipe } from "../../../../../../pipe/searchpipe.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FuseAlertComponent } from "../../../../../../../@fuse/components/alert/alert.component";
import { InventoryService } from '../inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { UnitsPopupComponent } from 'app/PopUp/units-popup/units-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-units',
    standalone: true,
    templateUrl: './units.component.html',
    styleUrl: './units.component.scss',
    imports: [CommonModule, 
        SearchpipePipe, MatIconModule,
         MatFormFieldModule, ReactiveFormsModule, MatInputModule,
         FuseAlertComponent ,FormsModule,MatButtonModule,MatPaginatorModule]
})
export class UnitsComponent implements OnInit {
unit: any;
all_units_category:any[]=[];
Click_Event_Sub:Subscription
pageSize = 10; // Set your desired page size
pageSizeOptions = [5, 10, 25, 100]; // Define your page size options
Search_CateGory_data:string;



constructor(private api_call : InventoryService,
    private dialoRef : MatDialog,){


        this.Click_Event_Sub =this.api_call.getEvent().subscribe((res)=>{
            
            this.display_all_data();

        })
    }

 display_all_units :any[];

 isToggle: any;

products: any[];


ngOnInit(): void {
    this.display_all_data();
    
    
}

display_all_data(){
    this.api_call.get_ALL_units().subscribe((res)=>{
        console.log(res.data.result)
        this.all_units_category = res.data.result
        this.products = this.all_units_category.slice(0, this.pageSize);
    })
}




ascending(){
    this.products = this.products.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
    });
  
  }

  ascending1(){
    this.products = this.all_units_category.sort((a: any, b: any) => {
        return a.shortName.localeCompare(b.shortName);
    });
  
  }

  dcending1(){
    this.products = this.products.sort((a: any, b: any) => {
        return b.shortName.localeCompare(a.shortName);
    });
  
  }
  
  dcending(){
    this.products = this.products.sort((a: any, b: any) => {
        return b.name.localeCompare(a.name);
    });
  
  }



  
  toggleState() {
    this.isToggle = !this.isToggle;
    if (this.isToggle) {
        this.ascending();
        this.ascending1();
    } else {
        this.dcending();
        this.dcending1();
    }
  
}







create__Product() {
 this.dialoRef.open(UnitsPopupComponent)
}
Update__Product(data:any) {
   

    this.dialoRef.open(UnitsPopupComponent,{
        data: {
              id :data.id,
              factorBaseRatio :data.factorBaseRatio,
              name :data.name,
              unitCategoryName:data.unitCategoryName,
              unitTypeName :data.unitTypeName

            }
      })
   }





   // Method to handle page change event
pageChanged(event: any) {
    // You can fetch data for the new page here based on event.pageIndex and event.pageSize

     // Calculate the starting index of the displayed items
  const startIndex = event.pageIndex * event.pageSize;
  // Slice the array to get the items for the current page
  this.products = this.all_units_category.slice(startIndex, startIndex + event.pageSize);

  
  }
  


}
