import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments/environment';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServService {

  constructor(private _httpClient :HttpClient) { }

  private subject = new Subject<any>();
  

  getEvent():Observable<any>{
    return this.subject.asObservable();
    }

  sentEvent(){
    this.subject.next(void 0);
   }

  
  GetAllDepartments(){

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
         
          return this._httpClient.post<any>(`${environment.apiURL}/Department/GetAllDepartments`,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }


  
  CreateDepartment(data:any){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "name":data.Name ,
            "description": data.Description
          }

        
         
          return this._httpClient.post<any>(`${environment.apiURL}/Department/CreateDepartment`,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }


    
  UpdateDepartment(data:any,id:any){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "id": id,
            "name": data.Name,
            "description": data.Description
          }
         console.log(key)
          return this._httpClient.post<any>(`${environment.apiURL}/Department/UpdateDepartment`,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }



    
  DeleteDepartment(id:any){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "id": id
          }
         
          return this._httpClient.post<any>(`${environment.apiURL}/Department/DeleteDepartment`,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }


}
