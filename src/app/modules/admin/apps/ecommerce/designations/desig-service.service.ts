import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments/environment';
import { Observable, map } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesigServiceService {

  constructor(private _httpClient :HttpClient) { }


  private subject = new Subject<any>();
  

  getEvent():Observable<any>{
    return this.subject.asObservable();
    }

  sentEvent(){
    this.subject.next(void 0);
   }
   
  GetAllDesignations(){

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
         
          return this._httpClient.post<any>(`${environment.apiURL}/Designation/GetAllDesignations`,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }

  
  CreateDesignation(data:any){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "name": data.Name,
            "description": data.Description
          }
         
          return this._httpClient.post<any>(`${environment.apiURL}/Designation/CreateDesignation` ,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }

  
  UpdateDesignation(data:any,id:any){

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
      
         
         
          return this._httpClient.post<any>(`${environment.apiURL}/Designation/UpdateDesignation`,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }


    
  DeleteDesignation(id:any){

    const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };
          
          const key = {
            "id": id
          }
         
          return this._httpClient.post<any>(`${environment.apiURL}/Designation/DeleteDesignation` ,key, httpOptions ).pipe(
                map((response) =>
                { 
                             return  response;
                }), 
            );
  
  }



}
