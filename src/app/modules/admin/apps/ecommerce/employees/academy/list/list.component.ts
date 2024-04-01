import { CdkScrollable } from '@angular/cdk/scrolling';
import { I18nPluralPipe, NgClass, NgFor, NgIf, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy,  Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { EmployeesServiceService } from '../../employees-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector       : 'academy-list',
    templateUrl    : './list.component.html',
    standalone     : true,
    imports        : [CdkScrollable, MatFormFieldModule,
            MatSelectModule, MatOptionModule, NgFor, MatIconModule, FormsModule,
            MatInputModule, MatSlideToggleModule, NgIf, NgClass,ReactiveFormsModule, MatTooltipModule, 
            MatProgressBarModule, MatButtonModule, RouterLink, FuseFindByKeyPipe, PercentPipe, 
            I18nPluralPipe],
})
export class AcademyListComponent implements OnInit
{
showAboveRow: any;
Search_CateGory_data:string;
products_groups_all_data:any[]=[];


    constructor(private _empService : EmployeesServiceService,private route : Router){}

    ngOnInit(): void
    {
      this.get_all_data();
    }





    get_all_data() {
        this._empService.GetAllEmployees().subscribe((res)=>{
           console.log(res.data.result)
             this.products_groups_all_data = res.data.result
        })
       }
 
       Update_emp(){
        setTimeout(() => {
          this.route.navigate(['/Employees/Detailed'])
        }, 200);
         
       }

       AddProduct() {
        setTimeout(() => {
          this.route.navigate(['/Employees/Add'])
        }, 200);
       }

}
