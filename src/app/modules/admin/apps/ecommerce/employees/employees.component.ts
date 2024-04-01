import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule,FormGroup ,ReactiveFormsModule, Validators} from '@angular/forms';
import { EmployeesServiceService } from './employees-service.service';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,FormsModule,ReactiveFormsModule,
    MatInputModule,MatSelectModule,MatDatepickerModule,MatRadioModule,MatFormFieldModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
products_groups_all_data: any=[];
Search_CateGory_data: any;
  products: any;
checked: boolean=false;

Add_employee = this._formBuilder.group({
  Employee_Code:['',Validators.required],
  First_Name:['',Validators.required],
  Middle_Name:['',Validators.required],
  Last_Name:['',Validators.required],
  Birth_Date:['',Validators.required],
  Gender:['',Validators.required],
  Email_Id:['',Validators.required],
  Joining_On:['',Validators.required],
  Mobile_No:['',Validators.required],
  Contact_No:['',Validators.required],
  Parmenant_Address:['',Validators.required],
  Current_Address:['',Validators.required],
})


constructor(private Employees_api:EmployeesServiceService,
  private route : Router,private _formBuilder: FormBuilder){}


ngOnInit(): void {
  this.get_all_data();
}
toggle_cat() {
throw new Error('Method not implemented.');
}
isToggle_cateGory: any;
Create_Category() {
  this.route.navigate(['Update_Add']);

}



get_all_data() {
  this.Employees_api.GetAllEmployees().subscribe((res)=>{
     console.log(res.data.result)
       this.products_groups_all_data = res.data.result
  })
 }


 Go_Back(){
  this.route.navigate(['Update_Add']);
 }


 add_New_Emp(){
  
  this.Employees_api.CreateEmployee(this.Add_employee.value).subscribe((res)=>{
    console.log(res)
         return res
  })
 }

}
