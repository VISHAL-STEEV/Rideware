import { CdkScrollable } from '@angular/cdk/scrolling';
import { DOCUMENT, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { AcademyService } from 'app/modules/admin/apps/ecommerce/employees/academy/academy.service';
import { Category, Course } from 'app/modules/admin/apps/ecommerce/employees/academy/academy.types';
import { Subject, takeUntil } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,FormGroup,FormControl,ReactiveFormsModule,Validator, FormBuilder, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient ,HttpEventType } from '@angular/common/http';


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
        private _FormBuilder :FormBuilder
    )
    {
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
  this.Personal_data()
  this.Office_data();
  this.Bank_data();

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
        console.log(this.Up_emp_Office.value)
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


}
