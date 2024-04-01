import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, Subject, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from 'environments/environments/environment';


@Injectable({providedIn: 'root'})
export class InventoryService implements OnInit
{
   
    
    private booleanValueSubject = new BehaviorSubject<boolean>(false);
    booleanValue$ = this.booleanValueSubject.asObservable();
    private subject = new Subject<any>();


    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }
    ngOnInit(): void {
      
    }


    getEvent():Observable<any>{
    return this.subject.asObservable();
    }
    sentEvent(){
     this.subject.next(void 0);
    }

   

  create_inventory_product(name:any, shortName:any){


    const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };

        const data ={
            "name":name,
            "shortName":shortName
        }
         



        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/CreateWarehouse` ,data, httpOptions ).pipe(
              map((response) =>
              {        try {
               
                return  response;
              } catch (error) {
                console.log(error)              }
                          
              }), 
          );
  }





   
    getProducts(){
        const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };
        
        const key = {
        "searchKeyword" : " " ,
        "pageIndex":0,
        "pageSize":0,
        }
        // api/apps/ecommerce/inventory/products

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllwarehouses` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );
    }


    get_units(){
        const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };
        
        const key = {
        "searchKeyword" : "" ,
        "pageIndex":0,
        "pageSize":0,
         "isAllUnit":1
        }
        // api/apps/ecommerce/inventory/products

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllUnitCategories` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );
    }


    update_inventy(data:any){

            const accessToken =localStorage.getItem('accessToken')
            const httpOptions = {
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + accessToken
            })
            };


    const update_data ={
        id :data.id,
        name:data.na_me,
        shortName:data.short_Name
    }
         


        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/UpdateWarehouse` ,update_data, httpOptions ).pipe(
            map((response) =>
            { 
                         return  response;
            }), 
        );
    }






   



   get_ALL_units(){



    const accessToken =localStorage.getItem('accessToken')
    const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer ' + accessToken
    })
    };

     

       const units_data ={
        "searchKeyword": "",
        "pageIndex": 0,
        "pageSize": 0,
        "unitCategoryId": null,
        "isAllUnit": 1
      }

    return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllReferenceUnits` ,units_data, httpOptions ).pipe(
        map((response) =>
        { 
                     return  response;
        }), 
    );

   }



   Create_category(data:any){



    const accessToken =localStorage.getItem('accessToken')
    const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer ' + accessToken
    })
    };

     console.log(data)

       const units_data ={
        "name":data
      }

    return this._httpClient.post<any>(`${environment.apiURL}/Inventory/CreateUnitCategory` ,units_data, httpOptions ).pipe(
        map((response) =>
        { 
                     return  response;
        }), 
    );

   }


   Update_category(data:any,id:any){



    const accessToken =localStorage.getItem('accessToken')
    const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer ' + accessToken
    })
    };

     

       const units_data ={
         "id":id,
        "name":data
      }

    return this._httpClient.post<any>(`${environment.apiURL}/Inventory/UpdateUnitCategory` ,units_data, httpOptions ).pipe(
        map((response) =>
        { 
                     return  response;
        }), 
    );

   }


   
   Inventory_CreateUnit(data:any){



    const accessToken =localStorage.getItem('accessToken')
    const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer ' + accessToken
    })
    };

     

       const units_data ={
        "name": data.name,
        "factorBaseRatio": data.factorBaseRatio,
        "unitType": data.unitType,
        "unitCategoryid": data.unitCategoryid
      }

    return this._httpClient.post<any>(`${environment.apiURL}/Inventory/CreateUnit` ,units_data, httpOptions ).pipe(
        map((response) =>
        { 
                     return  response;
        }), 
    );

   }





      
   Inventory_UpdateUnit(data:any){



    const accessToken =localStorage.getItem('accessToken')
    const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer ' + accessToken
    })
    };

   

       const units_data ={
        "id": data.id,
        "name": data.name,
        "factorBaseRatio": data.factorBaseRatio,
        "unitType": data.unitType,
        
      }

      console.log(units_data)

    return this._httpClient.post<any>(`${environment.apiURL}/Inventory/UpdateUnit` ,units_data, httpOptions ).pipe(
        map((response) =>
        { 
                     return  response;
        }), 
    );

   }






   refresh_update_data(value: boolean) {
    this.booleanValueSubject.next(value);
  }






}
