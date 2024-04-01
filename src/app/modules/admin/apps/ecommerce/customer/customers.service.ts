import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private _httpClient :HttpClient) { }



  UpdateCustomer(data:any ,id:any){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "id": id,
            "name": data.Name,
            "contactName": data.Contact_Name,
            "companyName": "Rideware",
            "referenceNo": data.Referance_No,
            "address": data.Address,
            "street": data.Street,
            "city": data.City,
            "state": data.State,
            "zip": data.Zip,
            "phone1": data.Phone_No,
            "phone2": data.Phone_No2,
            "email": data.Email,
            "taxRegNo": data.Tax_RegNo,
            "tinNo": data.Tin_No,
            "countryid": data.Country,
            "parentCompany": data.Company,
            "branchCompany": data.Branch
          }


          console.log(key)
         
          return this._httpClient.post<any>(`${environment.apiURL}/Customer/UpdateCustomer` ,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }


  

  GetAllBranchCustomers(id:any){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "searchKeyword": "",
            "pageIndex": 0,
            "pageSize": 0,
            "id": id
          }
         
          return this._httpClient.post<any>(`${environment.apiURL}/Customer/GetAllBranchCustomers` ,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }
  

  GetAllCustomers(){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "searchKeyword": "",
            "pageIndex": 0,
            "pageSize": 0,
            
          }
         
          return this._httpClient.post<any>(`${environment.apiURL}/Customer/GetAllCustomers` ,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }

  

  CreateCustomer(data:any){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
    
          const key = {
            "name": data.Name,
            "contactName": data.Contact_Name,
            "companyName":"Rideware",
            "referenceNo": data.Referance_No,
            "address": data.Address,
            "street": data.Street,
            "city": data.City,
            "state": data.State,
            "zip": data.Zip,
            "phone1": data.Phone_No,
            "phone2": data.Phone_No2,
            "email": data.Email,
            "taxRegNo": data.Tax_RegNo,
            "tinNo": data.Tin_No,
            "countryid": data.Country,
            "partnerTypes": 1,
            "parentCompany": data.Company,
            "branchCompany":data.Branch
          }
          console.log(key)
          return this._httpClient.post<any>(`${environment.apiURL}/Customer/CreateCustomer` ,key, httpOptions ).pipe(
                map((response) =>
                {           console.log(response)
                             return  response;
                }), 
            );
  
  }


  
  GetAllCountry(){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "searchKeyword": "",
            "pageIndex": 0,
            "pageSize": 0
          }
         
          return this._httpClient.post<any>(`${environment.apiURL}/User/GetAllCountry` ,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }





  token_replace(data:any){
    return this._httpClient.post<any>('http://3.28.120.132:5208/User/ValidateRefreshToken', data).pipe(
      map((res: any) => {

        const token = res.data.token;
        const refreshToken = res.data.refreshToken;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken',refreshToken)
      
        return res;
      })
    );

  }




}
