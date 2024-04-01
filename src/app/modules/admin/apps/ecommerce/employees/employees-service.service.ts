import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesServiceService {

  constructor(private _httpClient :HttpClient) { }




  GetAllEmployees(){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "searchKeyword": " ",
            "pageIndex": 0,
            "pageSize": 0
          }
         
          return this._httpClient.post<any>(`${environment.apiURL}/Employee/GetAllEmployees`,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }


    
  CreateEmployee(data:any){
    

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "firstName": data.First_Name,
            "lastName": data.Last_Name,
            "middleName": data.Middle_Name,
            "birthDate": data.Birth_Date.toString(),
            "gender": 0,
            "parmenantAddress": data.Parmenant_Address,
            "currentAddress": data.Current_Address,
            "isCurrentSameAsParmenantAddress": true,
            "personalEmailId": data.Email_Id,
            "personalMobileNo":data.Mobile_No,
            "otherContactNo": data.Contact_No,
            "employeeCode": data.Employee_Code,
            "joiningOn": data.Joining_On.toString()
          }
         console.log(key)
          return this._httpClient.post<any>(`${environment.apiURL}/Employee/CreateEmployee`,key, httpOptions ).pipe(
                map((response) =>
                { 
                      
                             return  response;
                }), 
            );
  
  }



  
  UpdateEmployee(){


    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "firstName": "string",
            "lastName": "string",
            "middleName": "string",
            "officeEmailId": "string",
            "officeContactNo": "string",
            "joiningOn": "2024-03-21T05:39:21.197Z",
            "relievingOn": "2024-03-21T05:39:21.197Z",
            "confirmationOn": "2024-03-21T05:39:21.197Z",
            "resignationOn": "2024-03-21T05:39:21.197Z",
            "designationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "reportingToId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "departmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          }
         
          return this._httpClient.post<any>(`${environment.apiURL}/Employee/UpdateEmployee`,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }


  



}
