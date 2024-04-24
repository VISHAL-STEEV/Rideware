import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'environments/environments/environment';
import {  map, Observable, of, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AcademyService
{

    private subject = new Subject<any>();
  
    AddEmployeeEducationData = signal<any[]>([]);


    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }




    AddEmployeeEducation(id:any,data:any){

        const accessToken =localStorage.getItem('accessToken')
              const httpOptions = {
              headers: new HttpHeaders({
              'Authorization': 'Bearer ' + accessToken
              })
              };


 
              
              const key = {
                "employeeId": id,
                "degree": data.NewDegree,
                "instituteName": data.NewInstitute_Name,
                "passingMonth": parseInt(data.NewqPassing_Monthe) ,
                "passingYear":parseInt(data.NewPassing_Year) ,
                "percentage": parseInt(data.NewPercentage)
              }
             
              return this._httpClient.post<any>(`${environment.apiURL}/EmployeeEducation/AddEmployeeEducation`,key, httpOptions ).pipe(
                    map((response) =>
                    {       


                         if(response.isValid === true){
                          this.GetEmployeeEducations(id).subscribe(res=>{
                                  this.AddEmployeeEducationData.update(oldData => [...oldData]);

                          });
                         }
                                 return  response;
                                 
                    }), 
                );
    
    
    
                
      
      }


      GetEmployeeEducations(id:any){

        const accessToken =localStorage.getItem('accessToken')
              const httpOptions = {
              headers: new HttpHeaders({
              'Authorization': 'Bearer ' + accessToken
              })
              };
              
              const key ={
                        "employeeId": id
                        }
                                    
              return this._httpClient.post<any>(`${environment.apiURL}/EmployeeEducation/GetEmployeeEducations`,key, httpOptions ).pipe(
                    map((response) =>
                    {    
                      this.AddEmployeeEducationData.set(response.data)
                         
                                 return  response;
                    }), 
                );
    
    
    
                
      
      }



      UpdateEmployee(id:any,data:any){

        const accessToken =localStorage.getItem('accessToken')
              const httpOptions = {
              headers: new HttpHeaders({
              'Authorization': 'Bearer ' + accessToken
              })
              };
              
              const key ={
                "id": id,
                "firstName": data.First_Name,
                "lastName": data.Last_Name,
                "middleName": data.Middle_Name,
                "officeEmailId": data.Office_Email_Id,
                "officeContactNo": data.Office_Cont_no,
                "joiningOn": data.Joining_On.toString(),
                "relievingOn": data.Relieving_On.toString(),
                "confirmationOn": data.Confirmation_On.toString(),
                "resignationOn":data.Resignation_On.toString(),
                "designationId": data.Designation,
                "reportingToId": id,
                "departmentId": data.Department
              }

              console.log(key)
              
                                    
              return this._httpClient.post<any>(`${environment.apiURL}/Employee/UpdateEmployee`,key, httpOptions ).pipe(
                    map((response) =>
                    {    
                                 return  response;
                    }), 
                );
    
    
    
                
      
      }


      UpdateEmployeePersonalDetail(id:any,data:any){

        const accessToken =localStorage.getItem('accessToken')
              const httpOptions = {
              headers: new HttpHeaders({
              'Authorization': 'Bearer ' + accessToken
              })
              };
              
              const key ={
                "id": id,
                "birthDate": data.Birth_Date.toString(),
                "bloodGroup": data.Blood_Group,
                "gender": 0,
                "parmenantAddress": data.Parmenant_Address,
                "currentAddress": data.Current_Address,
                "isCurrentSameAsParmenantAddress": true,
                "maritalStatus": 0,
                "personalEmailId": data.Personal_Email_Id,
                "personalMobileNo": data.Personal_Mobile_No,
                "otherContactNo": data.Other_Contact_No
              }

              console.log(key)
              
                                    
              return this._httpClient.post<any>(`${environment.apiURL}/EmployeePersonalDetail/UpdateEmployeePersonalDetail`,key, httpOptions ).pipe(
                    map((response) =>
                    {    
                                 return  response;
                    }), 
                );
    
    
    
                
      
      }




      

      AddEmployeeBankDetail(id:any,data:any){

        const accessToken =localStorage.getItem('accessToken')
              const httpOptions = {
              headers: new HttpHeaders({
              'Authorization': 'Bearer ' + accessToken
              })
              };
              
              const key ={
                "employeeId": id,
                "bankName": data.Bank_Name,
                "ifscCode": data.IFSC_Code,
                "branchAddress": data.Branch_Address,
                "accountNumber": data.Account_Number,
                "panNumber": data.PAN_Number,
                "pfNumber": data.PF_Number,
                "uanNumber": data.UAN_Number
              }

              
                                    
              return this._httpClient.post<any>(`${environment.apiURL}/EmployeeBankDetail/AddEmployeeBankDetail`,key, httpOptions ).pipe(
                    map((response) =>
                    {    
                                 return  response;
                    }), 
                );
    
    
    
                
      
      }



      UpdateEmployeeEducation(id:any,data:any){

        const accessToken =localStorage.getItem('accessToken')
              const httpOptions = {
              headers: new HttpHeaders({
              'Authorization': 'Bearer ' + accessToken
              })
              };

              
              
              const key ={
                "id": id,
                "degree": data.EMP_degree,
                "instituteName": data.EMP_instituteName,
                "passingMonth": parseInt(data.EMP_passingMonth),
                "passingYear": parseInt(data.EMP_passingsYear),
                "percentage":  parseInt(data.EMP_percentage)
              }
          

              
                                    
              return this._httpClient.post<any>(`${environment.apiURL}/EmployeeEducation/UpdateEmployeeEducation`,key, httpOptions ).pipe(
                    map((response) =>
                    {    
                                 return  response;
                    }), 
                );
    
    
    
                
      
      } 


      getEvent():Observable<any>{
        return this.subject.asObservable();
        }
    
      sentEvent(){
        this.subject.next(void 0);
       }
       






       

         UploadEmployeeProfilePhoto(id:any, Photo:any){
      
          const accessToken =localStorage.getItem('accessToken')
          const httpOptions = {
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
          })
          };

          
          
          const key ={
           "Id":id,
           "Photo":Photo
          }
      

          console.log(key)
          
                                
          return this._httpClient.post<any>(`${environment.apiURL}/Employee/UploadEmployeeProfilePhoto`,key, httpOptions ).pipe(
                map((response) =>
                {    
                             return  response;
                }), 
            );





      }



  
      

}
