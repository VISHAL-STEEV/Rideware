import {  Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../../layout/common/search/search.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { MAT_DIALOG_DATA, MatDialog,MatDialogClose } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-cate-gory-pop-up',
    standalone: true,
    templateUrl: './cate-gory-pop-up.component.html',
    styleUrl: './cate-gory-pop-up.component.scss',
    imports: [CommonModule, SearchComponent,
              MatFormFieldModule,ReactiveFormsModule,
              MatOptionModule,MatCheckboxModule,
              MatInputModule,MatButtonModule,MatDialogClose]
})
export class CateGoryPopUpComponent implements OnInit {

    product_Form: FormGroup;   
    change_btn_content :boolean =true;

    constructor( private _inventoryService: InventoryService,
        private _formBuilder: FormBuilder,private dialoRef : MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr :ToastrService
        ){}
    

ngOnInit(): void {
    this.product_Form = this._formBuilder.group({
        name: ['', Validators.required],
       
    });

    

    if(this.data){

        this.product_Form.controls['name'].setValue(this.data.name);
        this.change_btn_content = false
    }
   
}

Create_Category(){
    
    if(this.data){
        console.log(this.data)
        const data =  this.product_Form.value.name
        this._inventoryService.Update_category(data,this.data.id).subscribe((res)=>{
          this._inventoryService.sentEvent();

           return res
        })
        
    }else{
        const data =  this.product_Form.value.name;
        
        this._inventoryService.Create_category(data).subscribe((res)=>{
            this._inventoryService.sentEvent();
           return res
        })
    }


}




}
