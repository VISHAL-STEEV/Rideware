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



  






  GetEmployeeProfilePhoto(){

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
         
          return this._httpClient.post<any>(`${environment.apiURL}/Employee/GetEmployeeProfilePhoto`,key, httpOptions ).pipe(
                map((response) =>
                {    
                             return  response;
                }), 
            );



            
  
  }
  






  GetEmployeeById(id:any){
    const accessToken =localStorage.getItem('accessToken')
    const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer ' + accessToken
    })
    };
    
    const key = {
      "id": id
    }
   
    return this._httpClient.post<any>(`${environment.apiURL}/Employee/GetEmployeeById`,key, httpOptions ).pipe(
          map((response) =>
          {    
                       return  response;
          }), 
      );


  }



  
  
  GetEmployeeBankDetail(id:any){
    const accessToken =localStorage.getItem('accessToken')
    const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer ' + accessToken
    })
    };
    
    const key = {
      "employeeId":id
    }
   
    return this._httpClient.post<any>(`${environment.apiURL}/EmployeeBankDetail/GetEmployeeBankDetail`,key, httpOptions ).pipe(
          map((response) =>
          {    
                       return  response;
          }), 
      );


  }

  GetEmployeePersonalDetailById(id:any){
    const accessToken =localStorage.getItem('accessToken')
    const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer ' + accessToken
    })
    };
    
    const key = {
      "employeeId":id
    }
   
    return this._httpClient.post<any>(`${environment.apiURL}/EmployeePersonalDetail/GetEmployeePersonalDetailById`,key, httpOptions ).pipe(
          map((response) =>
          {    
                       return  response;
          }), 
      );


  }


    






}
