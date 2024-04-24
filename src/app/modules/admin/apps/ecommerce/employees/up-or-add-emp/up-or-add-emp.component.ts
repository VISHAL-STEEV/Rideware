import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesServiceService } from '../employees-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { AcademyService } from '../academy/academy.service';

@Component({
  selector: 'app-up-or-add-emp',
  standalone: true,
  imports: [CommonModule,MatIconModule,ReactiveFormsModule,FormsModule,
         MatButtonModule,MatFormFieldModule,MatSelectModule,MatExpansionModule],
  templateUrl: './up-or-add-emp.component.html',
  styleUrl: './up-or-add-emp.component.scss'
})
export class UpOrAddEmpComponent implements OnInit {
Search_CateGory_data: any;
EmpolyeeData1: any[]=[];
EmpBankDetails:any[]=[];
EMPEdudetils:any[]=[];
EmpPersonal:any[]=[];
EMP_id:any;


constructor(private _empServiceID : EmployeesServiceService,
  private route : Router,
  private route_id:ActivatedRoute,
  private _academyService:AcademyService,
  private _EmployeeService:EmployeesServiceService
){}


ngOnInit(): void
{
  this.route_id.paramMap.subscribe(params => {
    this.EMP_id = params.get('id');
  });
  this.get_all_data();
  this.getEmpBank();
  this.GetEmpEducation();

  this.GetEmployeePersonalById()
}





get_all_data() {
  this._empServiceID.GetEmployeeById(this.EMP_id ).subscribe((res)=>{
 
       this.EmpolyeeData1 = [res.data] ;
    

  })
 }

 
getEmpBank(){
  console.log(this.EMP_id )
  this._empServiceID.GetEmployeeBankDetail(this.EMP_id ).subscribe((res)=>{
       this.EmpBankDetails =  [res.data] ;
     
       
  })
 }


 GetEmpEducation(){
  this._academyService.GetEmployeeEducations( this.EMP_id).subscribe((res)=>{ 
    this.EMPEdudetils = res.data;
      
}) 
 }




 GetEmployeePersonalById(){
  this._EmployeeService.GetEmployeePersonalDetailById( this.EMP_id).subscribe((res)=>{ 
    this.EmpPersonal= [res.data];
    
}) 
 }

}
