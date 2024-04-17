import { CdkScrollable } from '@angular/cdk/scrolling';
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
import { Subject, Subscription, takeUntil } from 'rxjs';
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


@Component({
    selector       : 'academy-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatSidenavModule,MatInputModule,MatRadioModule,ReactiveFormsModule,
                       RouterLink, MatIconModule,NgIf, NgClass,MatSelectModule,
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
    EmpEduData:FormGroup;
    employee_pic:string='';
    EMP_id:any;
    EMP_Edu_detils:any[]=[];
    Department:any[]=[];
    Designations_data:any[]=[];
    Click_EventSub:Subscription;
  

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _academyService: AcademyService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private route :Router,
        private http: HttpClient,
        private _FormBuilder :FormBuilder,
        private route_id:ActivatedRoute,
        private Department_api : DepartmentServService,
        private Designations_api : DesigServiceService
    )
    {
        this.Click_EventSub =this._academyService.getEvent().subscribe((res)=>{
            this.GetEmployee_Educations();
            
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


        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {
                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

         
          

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
        console.log(formData)

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
 


    AddEmployee_Education(){
      this._academyService.AddEmployeeEducation().subscribe((res)=>{ 

        console.log(res)
      }) 
    }


    GetEmployee_Educations(){
        this._academyService.GetEmployeeEducations( this.EMP_id).subscribe((res)=>{ 
            this.EMP_Edu_detils =res.data;
          console.log(res.data);

        }) 
      }





      
    Add_Bank_details(){
        this._academyService.AddEmployeeBankDetail(this.EMP_id,this.Up_emp_Bank.value).subscribe((res)=>{ 
          console.log(res);
        });
    }

    Add_Personal_details(){
        this._academyService.UpdateEmployeePersonalDetail(this.EMP_id,this.Up_emp_Personal.value).subscribe((res)=>{ 
            console.log(res);
          });
    }

    Add_Office_details(){
        this._academyService.UpdateEmployee(this.EMP_id,this.Up_emp_Office.value).subscribe((res)=>{ 
            console.log(res);
          });
    }




    get_Department(){
        this.Department_api.GetAllDepartments().subscribe((res)=>{
           console.log(res.data.result)
             this.Department = res.data.result;
        })
       }


       
get_Designations(){
    this.Designations_api.GetAllDesignations().subscribe((res)=>{
       console.log(res.data.result)
         this.Designations_data = res.data.result
    })
   }




// function for  delete education data 


DeteteEduData(id:any){
  console.log(id);
  console.log(this.EmpEduData.value);
}



// function for  UPDATE education data 

edit_emp(data:any){
    console.log(data.isEditing);
    data.isEditing =!data.isEditing;

    if(data.isEditing === false){
        
             
        this._academyService.UpdateEmployeeEducation(data.id,this.EmpEduData.value).subscribe((res)=>{ 
            this._academyService.sentEvent();
            return res
        });
        

    }else{
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

        console.log(formData)

    }
  }  

}
