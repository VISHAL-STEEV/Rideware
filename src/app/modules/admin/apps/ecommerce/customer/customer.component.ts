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
import { CustomersService } from './customers.service';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { SearchpipePipe } from "../../../../../pipe/searchpipe.pipe";




@Component({
    selector: 'app-customer',
    standalone: true,
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss',
    imports: [CommonModule, MatIconModule, MatInputModule, MatSelectModule,
        MatFormFieldModule, ReactiveFormsModule, MatChipsModule,
        FuseAlertComponent, FormsModule, MatButtonModule, MatPaginatorModule, SearchpipePipe]
})
export class CustomerComponent implements OnInit {
  Search_CateGory_data:string;
  all_units_category: any[] = [];
  data: any;
  all_Branch: any[] = [];
  Get_All_Country: any[]=[];
  products: any[]=[];
  unit: any;
  Click_Event_Sub:Subscription
  pageSize = 10; // Set your desired page size
  pageSizeOptions = [5, 10, 25, 100]; // Define your page size options
  showAboveRow: boolean = false;
  isCompanyDisabled: boolean = false;
  isBranchDisabled: boolean = false;
  show_update_btn : boolean = false;



  constructor(private cous_service:CustomersService, private _formBuilder: FormBuilder,){}
ngOnInit(): void {
  this.getAllcous();
}


Customers_data =this._formBuilder.group({
  Company:['',Validators.required],
  Branch:['',Validators.required],
  Name:['',Validators.required],
  Contact_Name:['',Validators.required],
  Referance_No:['',Validators.required],
  partnerTypes:['',Validators.required],
  Street:['',Validators.required],
  City:['',Validators.required],
  State:['',Validators.required],
  Country:['',Validators.required],
  Zip:['',Validators.required],
  Phone_No:['',Validators.required],
  Phone_No2:['',Validators.required],
  Email:['',Validators.required],
  Tax_RegNo:['',Validators.required],
  Tin_No:['',Validators.required],
  Address:['',Validators.required]
})

getAllcous(){
  this.cous_service.GetAllCustomers().subscribe((res)=>{
    console.log(res.data.result)
    this.all_units_category = res.data.result
    this.products = this.all_units_category.slice(0, this.pageSize);
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


create__Product() {
 this.showAboveRow =  !this.showAboveRow;
 console.log(this.Customers_data.value)
 this.Get_all_contry_data();
}
isToggle: any;

toggleState() {
throw new Error('Method not implemented.');
}






Update__Product(units:any){
console.log(units.id);
units.isEditing = !units.isEditing;
this.cous_service.UpdateCustomer(this.Customers_data.value,units.id).subscribe((res)=>{
  console.log(res)
 return res;
});
}


Show__Product(units:any){
  units.isEditing = !units.isEditing;
  this.Get_all_contry_data();

  if(units.isEditing === false){
    this.Customers_data.reset();
  
  }else{
    this.Customers_data.controls['Company'].setValue(units.companyName);
    this.Customers_data.controls['Branch'].setValue(units.branchCompany);
    this.Customers_data.controls['Name'].setValue(units.name);
    this.Customers_data.controls['Contact_Name'].setValue(units.contactName);
    this.Customers_data.controls['Referance_No'].setValue(units.referenceNo);
    this.Customers_data.controls['partnerTypes'].setValue(units.partnerTypes);
    this.Customers_data.controls['Street'].setValue(units.street);
    this.Customers_data.controls['City'].setValue(units.city);
    this.Customers_data.controls['State'].setValue(units.state);
    this.Customers_data.controls['Country'].setValue(units.countryid);
    this.Customers_data.controls['Zip'].setValue(units.zip);
    this.Customers_data.controls['Phone_No'].setValue(units.phone1);
    this.Customers_data.controls['Phone_No2'].setValue(units.phone2);
    this.Customers_data.controls['Email'].setValue(units.email);
    this.Customers_data.controls['Tax_RegNo'].setValue(units.taxRegNo);
    this.Customers_data.controls['Tin_No'].setValue(units.tinNo);
    this.Customers_data.controls['Address'].setValue(units.address);  
  }

 
}

disableSelect(select: string): void {
  if (select === 'company') {
    this.isCompanyDisabled = true;
    this.isBranchDisabled = true;
  } else if (select === 'branch') {
    this.isBranchDisabled = true;
    this.isCompanyDisabled = false;
  } else {
    this.isCompanyDisabled = false;
    this.isBranchDisabled = false;
  }
}


GetBranch(data:any){
  this.cous_service.GetAllBranchCustomers(data).subscribe((res)=>{
    this.all_Branch=res.data.result;
}) 
}


subbimt_data(){

 
  this.cous_service.CreateCustomer(this.Customers_data.value).subscribe((res)=>{
    return res;
})  
}

Get_all_contry_data(){
  this.cous_service.GetAllCountry().subscribe((res)=>{
    this.Get_All_Country =res.data.result
     return res
   });
}


}
