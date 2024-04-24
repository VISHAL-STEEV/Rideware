import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UnitsPopupComponent } from 'app/PopUp/units-popup/units-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FuseAlertComponent } from '@fuse/components/alert';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { DepartmentServService } from './department-serv.service';
import { SearchpipePipe } from "../../../../../pipe/searchpipe.pipe";

@Component({
    selector: 'app-departments',
    standalone: true,
    templateUrl: './departments.component.html',
    styleUrl: './departments.component.scss',
    imports: [CommonModule, MatIconModule, MatInputModule, MatSelectModule,
        MatFormFieldModule, ReactiveFormsModule, MatChipsModule,
        FuseAlertComponent, FormsModule, MatButtonModule, MatPaginatorModule, SearchpipePipe]
})
export class DepartmentsComponent implements OnInit{
pageChanged($event: any) {
throw new Error('Method not implemented.');
}
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

  
  constructor(private _formBuilder: FormBuilder,private  Department_api : DepartmentServService){

    this.Click_EventSub =this.Department_api.getEvent().subscribe((res)=>{
      this.get_all_data();
      
  });

    
  }
  ngOnInit(): void {
    this.get_all_data()
  }

  Customers_data =this._formBuilder.group({
    Name:['',Validators.required],
    Description:['',Validators.required],
  
  })
toggleState() {
throw new Error('Method not implemented.');
}

isToggle: any;
create__Product() {
  this.showAboveRow =  !this.showAboveRow;
  if(this.showAboveRow===true){
    this.Customers_data.reset(); 
  }else{
    const data =this.Customers_data.value
    if(data.Name!== null && data.Description!== null){
      this.Department_api.CreateDepartment(data).subscribe((res)=>{
        console.log(res);
        this.Department_api.sentEvent()
      });
    }
    console.log(data)
  }
}

Update__Product(units:any){
 
  units.isEditing = !units.isEditing;


  if(units.isEditing === false){
    const data =this.Customers_data.value;
   
   this.Department_api.UpdateDepartment(data,units.id).subscribe((res)=>{
       console.log(res);
       this.Department_api.sentEvent()
  });
 }else{
  this.Customers_data.controls['Name'].setValue(units.name);
  this.Customers_data.controls['Description'].setValue(units.description);
 }

}


get_all_data() {
  this.Department_api.GetAllDepartments().subscribe((res)=>{
     console.log(res.data.result)
       this.products = res.data.result;
  })
 }


 Delete__Product(id:any){
  this.Department_api.DeleteDepartment(id).subscribe((res)=>{
    console.log(res)
    this.Department_api.sentEvent()
});
}


}
