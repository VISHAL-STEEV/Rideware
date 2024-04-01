import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryProductsService {

  constructor(private _httpClient : HttpClient) { }


// group api section update ,get ,create

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
       

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllProductGroup` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}

CreateProductGroup(data:any){
 

  const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };
        
        const key = {
            "name": data.name,
            "description": data.Description,
            "isStockGroup": data.Is_Stock_Group,
        }

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/CreateProductGroup` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}

UpdateProductGroup(data:any,id:any){



  const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };
        
        const key = {
          "id": id,
          "name": data.name,
          "description": data.Description
        }

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/UpdateProductGroup` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}






// Categories api section update ,get ,create
  
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
       

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllProductCategory` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}

CreateProductCategory(data:any){



  const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };
        
        const key = {
          "name": data.name,
          "description": data.Description,
          "incomeAccounts": "",
          "expenseAccounts": "",
          "productGroupId":  data.Product_Group
        }

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/CreateProductCategory` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}



UpdateProductCategory(data:any,id:any){




  const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };
        
        const key ={
          "id": id,
          "name": data.name,
          "description": data.Description,
          "incomeAccounts": "",
          "expenseAccounts": ""
        }

        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/UpdateProductCategory` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}




// products api section update ,get ,create


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
          "pageSize": 10
        }
       
        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllProducts` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}



GetProductDetailsById(ID:any){

  const accessToken =localStorage.getItem('accessToken')
  const httpOptions = {
  headers: new HttpHeaders({
  'Authorization': 'Bearer ' + accessToken
  })
  };


     const id ={
      "id": ID
    }

     console.log("service",id);

  return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetProductDetailsById`,id, httpOptions ).pipe(
      map((response) =>
      { 
                   return  response;
      }), 
  );

}




Create_product(data:any){


  const accessToken =localStorage.getItem('accessToken')
  const httpOptions = {
  headers: new HttpHeaders({
  'Authorization': 'Bearer ' + accessToken
  })
  };


     const units_data ={
      "productName": data.productName,
      "description": data.description,
      "internalReferance": data.internalReferance,
      "productGroupId": data.productGroupId,
      "barcode": data.barcode,
      "taxPercentage": 10,
      "minQuantity": 10,
      "maxQuantity":20,
      "reOrderQuantity": 0,
      "isSales": data.isSales,
      "isPurchase": data.isPurchase,
      "isAvailableInPOS": true,
      "productCategoryId": data.productCategoryId,
      "productTracking": 3,
      "unitId": data.unitId,
      "salesPrice": 20,
      "purchasePrice": 30,
      "costPrice": 0
    }


    const data_data ={
      "productName": "Moto G_HeadSet",
      "description": "EMoto G_HeadSet",
      "internalReferance": "123456",
      "productGroupId": "5C515510-3137-4C11-85F8-7A8BF34A8A20",
      "barcode": "456",
      "taxPercentage": 15,
      "isSales": true,
      "isPurchase": true,
      "isAvailableInPOS": true,
      "productCategoryId": "7135C71F-E1C7-4FBE-B3D0-62C628FF569D",
      "productTracking": 3,
      "unitId": "53C2B4F3-0354-4E71-87CF-F4113C402A73",
      "salesPrice": 50,
      "purchasePrice": 20,
      "costPrice": 0,
      "minQuantity":5,
      "maxQuantity":10,
      "reOrderQuantity":0
    }

     console.log("my data",units_data);
     console.log("krish data", data_data)

  return this._httpClient.post<any>(`${environment.apiURL}/Inventory/CreateProduct`,units_data, httpOptions ).pipe(
      map((response) =>
      {           console.log("res from backend",response)
                   return  response;
      }), 
  );

 }






 UpdateProduct(data:any,id:any){



  const accessToken =localStorage.getItem('accessToken')
  const httpOptions = {
  headers: new HttpHeaders({
  'Authorization': 'Bearer ' + accessToken
  })
  };

   

     const units_data ={

      "id": id,
      "productName": data.productName,
      "description":data.description,
      "internalReferance": data.internalReferance,
      "barcode": data.barcode,
      "isSales": data.isSales,
      "isPurchase": data.isPurchase,
      "isAvailableInPOS":data.isAvailableInPOS,
      "salesPrice": data.salesPrice,
      "purchasePrice": data.purchasePrice,
      "minQuantity": data.minQuantity,
      "maxQuantity": data.maxQuantity,
      "reOrderQuantity":data.reOrderQuantity,
    }


    console.log(units_data)

  return this._httpClient.post<any>(`${environment.apiURL}/Inventory/UpdateProduct` ,units_data, httpOptions ).pipe(
      map((response) =>
      { 
                   return  response;
      }), 
  );

 }



// priceList api section update ,get ,create


  
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
          "pageSize": 0
        }
       
        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/GetAllPriceLists` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}


CreatePriceLists(data:any){

  const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };


   
        
        const key ={
          "name": data.name,
          "isDefaultSales": data.Sales,
          "isDefaultPurchase": data.Purchase
        }
       
        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/CreatePriceLists` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}




UpdatePriceLists(data:any,id:any){

  const accessToken =localStorage.getItem('accessToken')
        const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
        })
        };
        
        const key ={
          "id": id,
          "name": data.name,
          "isDefaultSales": data.Sales,
          "isDefaultPurchase": data.Purchase
        }
        console.log(key,"key")
        return this._httpClient.post<any>(`${environment.apiURL}/Inventory/UpdatePriceLists` ,key, httpOptions ).pipe(
              map((response) =>
              { 
                           return  response;
              }), 
          );

}


}
