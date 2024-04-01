import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryProductsService {

  constructor(private _httpClient : HttpClient) { }

  
get_groups(){

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
        // api/apps/ecommerce/inventory/products

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllProductGroup` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}




  
get_Categories(){

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
        // api/apps/ecommerce/inventory/products

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllProductCategory` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}


get_products(){

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
        // api/apps/ecommerce/inventory/products

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllProducts` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}




  
get_priceList(){

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
          "priceListId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "unitId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
        // api/apps/ecommerce/inventory/products

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllProductPrice` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}


}
