import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FuseAlertComponent } from '@fuse/components/alert';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { Subscription } from 'rxjs';
import { DesigServiceService } from './desig-service.service';
import { SearchpipePipe } from "../../../../../pipe/searchpipe.pipe";

@Component({
    selector: 'app-designations',
    standalone: true,
    templateUrl: './designations.component.html',
    styleUrl: './designations.component.scss',
    imports: [CommonModule, MatIconModule, MatInputModule, MatSelectModule,
        MatFormFieldModule, ReactiveFormsModule, MatChipsModule,
        FuseAlertComponent, FormsModule, MatButtonModule, MatPaginatorModule, SearchpipePipe]
})
export class DesignationsComponent implements OnInit {
  Search_CateGory_data:string;
  all_units_category: any[] = [];
  data: any;
  all_Branch: any[] = [];
  products: any[]=[];
  unit: any;
  Click_Event_Sub:Subscription
  pageSize = 10; 
  pageSizeOptions = [5, 10, 25, 100]; 
  showAboveRow: boolean = false;
  isCompanyDisabled: boolean = false;
  isBranchDisabled: boolean = false;
   Click_EventSub:Subscription;
  Customers_data =this._formBuilder.group({
    Name:['',Validators.required],
    Description:['',Validators.required],
  
  })
ngOnInit(): void {
  this.get_all_data();
}
constructor(private design_api:DesigServiceService,private _formBuilder: FormBuilder,){
  this.Click_EventSub =this.design_api.getEvent().subscribe((res)=>{
    this.get_all_data();
    
});
}

createProduct() {
  this.showAboveRow =  !this.showAboveRow;
  if (this.showAboveRow === true) {
    this.Customers_data.reset(); 
  }else{
    const data =this.Customers_data.value
    if(data.Name!== null && data.Description!== null){
      
      this.design_api.CreateDesignation(data).subscribe((res)=>{
        console.log(res);
        this.design_api.sentEvent()
   });
    }

  }

}


isToggle: any;
toggleState() {
throw new Error('Method not implemented.');
}


pageChanged($event: any) {

}

Delete__Product(id:any){
  this.design_api.DeleteDesignation(id).subscribe((res)=>{
    console.log(res)
    this.design_api.sentEvent()
});
}


Update__Product(units:any){
 
  units.isEditing = !units.isEditing;


  if(units.isEditing === false){
     const data =this.Customers_data.value
    this.design_api.UpdateDesignation(data,units.id).subscribe((res)=>{
        console.log(res);
        this.design_api.sentEvent()
   });
  }else{
    this.Customers_data.controls['Name'].setValue(units.name);
    this.Customers_data.controls['Description'].setValue(units.description);
  }
 

}


get_all_data() {
 this.design_api.GetAllDesignations().subscribe((res)=>{
    console.log(res.data.result)
      this.products = res.data.result
 })
}





}

