import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation,NgModule} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import {  InventoryPagination } from 'app/modules/admin/apps/ecommerce/inventory/inventory.types';
import { values } from 'lodash';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil,interval, Subscription } from 'rxjs';
import{ MatDialog } from '@angular/material/dialog';
import {UdateInventoryComponent} from 'app/PopUp/udate-inventory/udate-inventory.component'
import { SearchpipePipe } from "../../../../../../pipe/searchpipe.pipe";
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'inventory-list',
    templateUrl: './inventory.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    standalone: true,
    imports: [NgIf, MatProgressBarModule, MatFormFieldModule,
            MatIconModule,
           MatInputModule, FormsModule, ReactiveFormsModule,
            MatButtonModule, 
           MatSortModule, NgFor, NgTemplateOutlet, 
           MatPaginatorModule,
            NgClass, MatSlideToggleModule,
            MatSelectModule, MatOptionModule, 
            MatCheckboxModule, MatRippleModule, AsyncPipe, 
              CurrencyPipe, SearchpipePipe]
})
export class InventoryListComponent implements OnInit
{
    products:any[]=[];
    update_id:any;
    pagination: InventoryPagination;
    Search_data:string;
    productForm: FormGroup;
    isToggle: boolean = false;
    name: string;
    SHortNaMe: string;
    booleanValue = false;
    ClickEventSub:Subscription
    pageSize = 10; // Set your desired page size
    pageSizeOptions = [5, 10, 25, 100]; // Define your page size options


    
    constructor(
        private dialoRef : MatDialog,
        private _inventoryService: InventoryService,
        private cdr: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private toastr :ToastrService
    )
    {
        this.ClickEventSub =this._inventoryService.getEvent().subscribe((res)=>{
            this.get_all_data();
            
        })
    }


    ngOnInit(): void
    {
     this.get_all_data()
     this.productForm = this._formBuilder.group({
        name: ['', Validators.required],
        shortName: ['', Validators.required]
    });
    }



    

   get_all_data(){
    
    this._inventoryService.getProducts().subscribe((res)=>{
        this.products = res.data.result
        this.cdr.detectChanges(); 
     })
   }


      ascending(){
        this.products = this.products.sort((a: any, b: any) => {
            return a.name.localeCompare(b.name);
        });
      
      }

      ascending1(){
        this.products = this.products.sort((a: any, b: any) => {
            return a.shortName.localeCompare(b.shortName);
        });
      
      }

      dcending1(){
        this.products = this.products.sort((a: any, b: any) => {
            return b.shortName.localeCompare(a.shortName);
        });
      
      }
      
      dcending(){
        this.products = this.products.sort((a: any, b: any) => {
            return b.name.localeCompare(a.name);
        });
      
      }



      
      toggleState() {
        this.isToggle = !this.isToggle;
        if (this.isToggle) {
            this.ascending();
            this.ascending1();
        } else {
            this.dcending();
            this.dcending1();
        }
    }



     

    createProduct() {
        this.update_id =null;
        this. opendialog();
    }

  


    Get_update_id(inventory:any){
        this.update_id =inventory.id;
        this.name = inventory.name;
        this.SHortNaMe = inventory.shortName
        this. opendialog();
    }




   



    opendialog(){
        const dialogRef = this.dialoRef.open(UdateInventoryComponent, {
            data: {
                   update_id: this.update_id , 
                   name :this.name,
                   shortName: this.SHortNaMe
                }
        });
      }




      
// Method to handle page change event
pageChanged(event: any) {
    // You can fetch data for the new page here based on event.pageIndex and event.pageSize
  }


}


