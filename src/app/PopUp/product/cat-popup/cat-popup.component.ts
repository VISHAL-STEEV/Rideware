import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { InventoryProductsService } from 'app/modules/admin/apps/ecommerce/inventory/inventory-products.service';

@Component({
  selector: 'app-cat-popup',
  standalone: true,
  imports: [CommonModule,MatIconModule,ReactiveFormsModule,MatDialogClose,
         MatInputModule,MatButtonModule,MatSlideToggleModule],
  templateUrl: './cat-popup.component.html',
  styleUrl: './cat-popup.component.scss'
})
export class CatPopupComponent implements OnInit{

  isDisabled:boolean=true;

  constructor( private _inventoryService: InventoryProductsService,
    private _formBuilder: FormBuilder,private dialoRef : MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr :ToastrService
    ){}

ngOnInit(): void {

  if(this.data){

    console.log(this.data)

   this.product_Group_form.controls['name'].setValue(this.data.name);
   this.product_Group_form.controls['Description'].setValue(this.data.description);
   this.isDisabled = false;
   
   
}

}
product_Group_form =   this._formBuilder.group({
  name: ['', Validators.required],
  Description: ['', Validators.required],
  Is_Stock_Group:[false]
});








submitProductForm() {

if(this.data){
  
  const data =  this.product_Group_form.value
 
  this._inventoryService.UpdateProductGroup(data,this.data.id).subscribe((res)=>{
    // this._inventoryService.sentEvent();
    this.toastr.success("data added","success")
     return res
  })
  
}else{

  if(this.product_Group_form.value.name ==="" || this.product_Group_form.value.Description ===""){
    this.toastr.warning("please enter valid data",)
  }else{

    const data =  this.product_Group_form.value;
    this._inventoryService.CreateProductGroup(data).subscribe((res)=>{
        // this._inventoryService.sentEvent();
        this.toastr.success("data added","success")
       return res
    })

  }

  
  

}

}

}
