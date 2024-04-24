import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { DOCUMENT, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { AcademyService } from 'app/modules/admin/apps/ecommerce/employees/academy/academy.service';
import { Category, Course } from 'app/modules/admin/apps/ecommerce/employees/academy/academy.types';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,FormGroup,FormControl,ReactiveFormsModule,Validator, FormBuilder, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient ,HttpEventType } from '@angular/common/http';
import { DepartmentServService } from '../../../departments/department-serv.service';
import { DesigServiceService } from '../../../designations/desig-service.service';
import { fuseAnimations } from '@fuse/animations';
import { EmployeesServiceService } from '../../employees-service.service';




@Component({
    selector       : 'academy-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    animations : fuseAnimations,
    imports        : [MatSidenavModule,MatInputModule,MatRadioModule,ReactiveFormsModule,
                       RouterLink, MatIconModule,NgIf, NgClass,MatSelectModule,CommonModule,
                      NgFor,MatButtonModule,MatProgressBarModule,CdkScrollable, MatDatepickerModule,
                      MatTabsModule, FuseFindByKeyPipe,FormsModule,MatFormFieldModule],
})
export class AcademyDetailsComponent implements OnInit, OnDestroy
{
    
    @ViewChild('courseSteps', {static: true}) courseSteps: MatTabGroup;
    @ViewChild('FileInput') fileInput :ElementRef | undefined;
    categories: Category[];
    course: Course;
    currentStep: number = 0;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    selectedFile: File | null = null;
    isUploading = false;
    Uploa_img :boolean;
    Up_emp_Office:FormGroup;
    Up_emp_Personal:FormGroup;
    Up_emp_Bank:FormGroup;
    AddNewEmpEduData:FormGroup;
    EmpEduData:FormGroup;
    employee_pic:string='';
    EMP_id:any;
    EMP_Edu_detils:any;
    Department:any[]=[];
    Designations_data:any[]=[];
    Click_EventSub:Subscription;
    visible:boolean=false;
    DeleteEduid:any;
    EmpBankDetailsid:any;
    EMPEdudetilsId:any;
    EmpPersonalid:any;
    EmpolyeeOfficialid:any;
    new_education:boolean=false;

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _academyService: AcademyService,
        private _EmployeeeService: EmployeesServiceService,
        private _changeDetectorRef: ChangeDetectorRef,
        private route :Router,
        private http: HttpClient,
        private _FormBuilder :FormBuilder,
        private route_id:ActivatedRoute,
        private Department_api : DepartmentServService,
        private Designations_api : DesigServiceService
    )
    {
        this.Click_EventSub =this._academyService.getEvent().subscribe((res)=>{
            setTimeout(() => {
                this.GetEmployee_Educations();
            }, 200); 
        });
    }



    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
      }


      uploadFile() {
        if (!this.selectedFile) return;
    
        this.isUploading = true;
        const formData = new FormData();
        formData.append('file', this.selectedFile);
    
        this.http.post('your-upload-api-url', formData)
          .subscribe(
            (response) => {
              console.log('Upload successful', response);
              // handle success
            },
            (error) => {
              console.error('Upload failed', error);
              // handle error
            }
          )
          .add(() => {
            this.isUploading = false;
          });
      }


    ngOnInit(): void
    {  
        this.route_id.paramMap.subscribe(params => {
            this.EMP_id = params.get('id');
          });
     this.employee_pic ="assets/images/propic.jpg"   
     this.Personal_data()
     this.Office_data();
     this.Bank_data();
     this.EmpEduDetails();
     this.GetEmployee_Educations();
     this.get_Department();
     this.get_Designations();
     this. fetchDataFromAPI();
  
     this.AddNewEmpEduData =this._FormBuilder.group({
        NewDegree:['',Validators.required],
        NewInstitute_Name:['',Validators.required],
        NewqPassing_Monthe:['',Validators.required],
        NewPassing_Year:['',Validators.required],
        NewPercentage:['',Validators.required], 
    })

this.course = {
    id: "123",
    title: "Introduction to TypeScript",
    slug: "typescript-intro",
    description: "A beginner's guide to TypeScript programming language.",
    category: "Programming",
    duration: 120, 
    steps: [
        {
            order: 0,
            title: "Office",
            subtitle: "Setting up your development environment",
            content:"Office",
        },
        {
            order: 1,
            title: "Personal",
            subtitle: "Understanding basic TypeScript syntax",
            content: "Personal",
        },  
        {
            order: 2,
            title: "Bank Information",
            subtitle: "Understanding basic TypeScript syntax",
            content: "Bank",
        }, 
        {
            order: 3,
            title: "Documents",
            subtitle: "Understanding basic TypeScript syntax",
            content: "Documents",
        }, 
        {
            order: 4,
            title: "Educations",
            subtitle: "Understanding basic TypeScript syntax",
            content: "Educations",
        }, 

    ],
    totalSteps: 5,
    updatedAt: Date.now(),
    featured: true,
    progress: {
        currentStep: 0,
        completed: 5, 
    } 
};


       

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to given step
     *
     * @param step
     */
    goToStep(step: number): void
    {
       
        // Set the current step
        this.currentStep = step;

        // Go to the step
        this.courseSteps.selectedIndex = this.currentStep;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Go to previous step
     */
    goToPreviousStep(): void
    {
        // Return if we already on the first step
        if ( this.currentStep === 0 )
        {
            return;
        }

        // Go to step
        this.goToStep(this.currentStep - 1);

        
        this._scrollCurrentStepElementIntoView();
    }

    /**
     * Go to next step
     */
    goToNextStep(): void
    {
        // Return if we already on the last step
        if ( this.currentStep === this.course.totalSteps - 1 )
        {
            return;
        }

        // Go to step
        this.goToStep(this.currentStep + 1);

        // Scroll the current step selector from sidenav into view
        this._scrollCurrentStepElementIntoView();
    }
    

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }


    home(){
        this.route.navigate(['Employees'])  
    }

    private _scrollCurrentStepElementIntoView(): void
    {
        // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
        setTimeout(() =>
        {
            // Get the current step element and scroll it into view
            const currentStepElement = this._document.getElementsByClassName('current-step')[0];
            if ( currentStepElement )
            {
                currentStepElement.scrollIntoView({
                    behavior: 'smooth',
                    block   : 'start',
                });
            }
        });
    }


    ImageUpload(event:any){
    var file =event.target.files[0];

    if(file){

        const formData:FormData =new FormData();
        formData.append('file',file,file.name);
    

        this._academyService.UploadEmployeeProfilePhoto( this.EMP_id, formData).subscribe((res)=>{ 
            this.EMP_Edu_detils =res.data;
          console.log(res.data);

        }) 
    }

      
    }




    
    Office_data(){
        this.Up_emp_Office = this._FormBuilder.group({
            First_Name:['',Validators.required],
            Last_Name:['',Validators.required],
            Office_Cont_no:['',Validators.required],
            Department:['',Validators.required],
            Reporting_To:['',Validators.required],
            Resignation_On:['',Validators.required],
            Middle_Name:['',Validators.required],
            Office_Email_Id:['',Validators.required],
            Joining_On:['',Validators.required],
            Designation:['',Validators.required],
            Confirmation_On:['',Validators.required],
            Relieving_On:['',Validators.required],
        })
    }

    Personal_data(){
        this.Up_emp_Personal = this._FormBuilder.group({
            Birth_Date:['',Validators.required],
            Blood_Group:['',Validators.required],
            Personal_Email_Id:['',Validators.required],
            Other_Contact_No:['',Validators.required],
            Gender:['',Validators.required],
            Marital_Status:['',Validators.required],
            Personal_Mobile_No:['',Validators.required],
            Parmenant_Address:['',Validators.required],
            Current_Address:['',Validators.required]
        })
    }





    Bank_data(){
        this.Up_emp_Bank= this._FormBuilder.group({
            Bank_Name:['',Validators.required],
            Account_Number:['',Validators.required],
            IFSC_Code:['',Validators.required],
            PAN_Number:['',Validators.required],
            PF_Number:['',Validators.required],
            UAN_Number:['',Validators.required],
            Branch_Address:['',Validators.required],
        })
    }
    
  
     
    EmpEduDetails(){    
        this.EmpEduData = this._FormBuilder.group({
            EMP_degree:['',Validators.required],
            EMP_instituteName:['',Validators.required],
            EMP_passingMonth:['',Validators.required],
            EMP_passingsYear:['',Validators.required],
            EMP_percentage:['',Validators.required],
        })
    }
 



    GetEmployee_Educations(){
        this._academyService.GetEmployeeEducations( this.EMP_id).subscribe((res)=>{ 
            return res;
        }) 

      
    

      }



// funtion for adding new education

Add_new_eduCation(){
    this.new_education  = !this.new_education
 
    if(this.new_education=== false){
              
    this._academyService.AddEmployeeEducation(  this.EMP_id, this.AddNewEmpEduData.value ).subscribe((res)=>{ 
        this.AddNewEmpEduData.reset()
         return res;   
   }) ;
    }
 
 
   }

      
    Add_Bank_details(){
        this._academyService.AddEmployeeBankDetail(this.EMP_id,this.Up_emp_Bank.value).subscribe((res)=>{ 
            return res;
        });
    }

    Add_Personal_details(){
        this._academyService.UpdateEmployeePersonalDetail(this.EMP_id,this.Up_emp_Personal.value).subscribe((res)=>{ 
            return res;
          });
    }

    Add_Office_details(){
        this._academyService.UpdateEmployee(this.EMP_id,this.Up_emp_Office.value).subscribe((res)=>{ 
            return res;
          });
    }




    get_Department(){
        this.Department_api.GetAllDepartments().subscribe((res)=>{
          
             this.Department = res.data.result;
        })
       }


       
get_Designations(){
    this.Designations_api.GetAllDesignations().subscribe((res)=>{
      
         this.Designations_data = res.data.result
    })
   }




// function for  delete education data 


DeteteEduData(id:any){
 
  this.visible=! this.visible;
  this.DeleteEduid =id;
  
}

deleteItem(){
    this.visible=! this.visible
}

deleteRduBackend(){
    this.visible=! this.visible
   this._EmployeeeService.RemoveEmployeeEducation(this.DeleteEduid).subscribe((res:any)=>{
    this. GetEmployee_Educations();
   
   })
}

togglePopUp() {
    this.visible = !this.visible;
  }

// function for  UPDATE education data 

edit_emp(data:any){
   
    data.isEditing =!data.isEditing;

    if(data.isEditing === false){
        console.log(data.isEditing);
 
             
        this._academyService.UpdateEmployeeEducation(data.id,this.EmpEduData.value).subscribe((res)=>{ 
                    this._academyService.sentEvent();
                    console.log(res);
        });
        

    }else{
        console.log(data.isEditing);

        this.EmpEduData.controls['EMP_degree'].setValue(data.degree);
        this.EmpEduData.controls['EMP_instituteName'].setValue(data.instituteName);
        this.EmpEduData.controls['EMP_passingMonth'].setValue(data.passingMonth);
        this.EmpEduData.controls['EMP_passingsYear'].setValue(data.passingYear);
        this.EmpEduData.controls['EMP_percentage'].setValue(data.percentage);
    }
  }
   
  Upload_document(event:any){
    
    if(event.target.files.length >0){
        const file =event.target.files[0];
        const formData = new FormData();
        formData.append('Files',file);

       

    }
  } 
  
  






  




   fetchDataFromAPI(){
                this._EmployeeeService.GetEmployeeById(this.EMP_id ).subscribe((res)=>{

                    if(res.data){
                        this.Up_emp_Office.controls['First_Name'].setValue(res.data.firstName);
                        this.Up_emp_Office.controls['Last_Name'].setValue(res.data.lastName);
                        this.Up_emp_Office.controls['Office_Cont_no'].setValue(res.data.officeContactNo);
                        this.Up_emp_Office.controls['Department'].setValue(res.data.departmentId);
                        this.Up_emp_Office.controls['Reporting_To'].setValue(res.data.reportingToName);
                        this.Up_emp_Office.controls['Resignation_On'].setValue(res.data.resignationOn);
                        this.Up_emp_Office.controls['Middle_Name'].setValue(res.data.firstName);
                        this.Up_emp_Office.controls['Office_Email_Id'].setValue(res.data.officeEmailId);
                        this.Up_emp_Office.controls['Joining_On'].setValue(res.data.joiningOn);
                        this.Up_emp_Office.controls['Designation'].setValue(res.data.designationId);
                        this.Up_emp_Office.controls['Confirmation_On'].setValue(res.data.confirmationOn);
                        this.Up_emp_Office.controls['Relieving_On'].setValue(res.data.relievingOn);
                        this.EmpolyeeOfficialid = [res.data] ;

                        console.log(res.data)
                    }
  
                    
                    

                   
            });


            this._EmployeeeService.GetEmployeePersonalDetailById( this.EMP_id).subscribe((res)=>{ 
                this.EmpPersonalid= res.data;
                if(res.data){
                    this.Up_emp_Personal.controls['Birth_Date'].setValue(res.data.birthDate);
                    this.Up_emp_Personal.controls['Blood_Group'].setValue(res.data.bloodGroup);
                    this.Up_emp_Personal.controls['Personal_Email_Id'].setValue(res.data.personalEmailId);
                    this.Up_emp_Personal.controls['Other_Contact_No'].setValue(res.data.otherContactNo);
                    this.Up_emp_Personal.controls['Gender'].setValue(res.data.genderText);
                    this.Up_emp_Personal.controls['Marital_Status'].setValue(res.data.maritalStatusText);
                    this.Up_emp_Personal.controls['Personal_Mobile_No'].setValue(res.data.personalMobileNo);
                    this.Up_emp_Personal.controls['Parmenant_Address'].setValue(res.data.parmenantAddress);
                    this.Up_emp_Personal.controls['Current_Address'].setValue(res.data.currentAddress);


                }
                
                   
                
            });


            this._EmployeeeService.GetEmployeeBankDetail(this.EMP_id ).subscribe((res)=>{

                if(res.data){
                    this.Up_emp_Bank.controls['Bank_Name'].setValue(res.data.bankName);
                    this.Up_emp_Bank.controls['Account_Number'].setValue(res.data.accountNumber);
                    this.Up_emp_Bank.controls['IFSC_Code'].setValue(res.data.ifscCode);
                    this.Up_emp_Bank.controls['PAN_Number'].setValue(res.data.panNumber);
                    this.Up_emp_Bank.controls['PF_Number'].setValue(res.data.pfNumber);
                    this.Up_emp_Bank.controls['UAN_Number'].setValue(res.data.uanNumber);
                    this.Up_emp_Bank.controls['Branch_Address'].setValue(res.data.branchAddress);

                    this.EmpBankDetailsid =  res.data;  
                }

            

               
               
            });
   }











}
