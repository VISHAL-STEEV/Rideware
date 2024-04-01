import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { InventoryProductsService } from 'app/modules/admin/apps/ecommerce/inventory/inventory-products.service';

@Component({
  selector: 'app-price-list-po-pup',
  standalone: true,
  imports: [CommonModule,MatIconModule,ReactiveFormsModule,
          MatDialogClose,MatInputModule,MatButtonModule,MatSlideToggleModule],
  templateUrl: './price-list-po-pup.component.html',
  styleUrl: './price-list-po-pup.component.scss'
})
export class PriceListPoPUpComponent implements OnInit {
Heading: any;



  constructor( private _inventoryService: InventoryProductsService,
    private _formBuilder: FormBuilder,private dialoRef : MatDialog,
    private router: Router,@Inject(MAT_DIALOG_DATA) public data: any,
    private toastr :ToastrService
    ){}





    productForm = this._formBuilder.group({
      name :['',Validators.required],
      Sales:[false],
      Purchase:[false]
    })



    ngOnInit(): void {
   
   
      
      if(this.data){
   
        console.log(this.data)
   
       this.productForm.controls['name'].setValue(this.data.name);
       

   } }

    submitProductForm() {

     console.log(this.productForm.value)


     
     if(this.data){
       
       const data =  this.productForm.value
      
       this._inventoryService.UpdatePriceLists(data,this.data.id).subscribe((res)=>{
         // this._inventoryService.sentEvent();
     
          return res
       })
       
     }else{
   
       if(this.productForm.value.name === "" ){
         this.toastr.warning("please enter valid data")
       }else{
   
         const data =  this.productForm.value;
     
         this._inventoryService.CreatePriceLists(data).subscribe((res)=>{
             // this._inventoryService.sentEvent();
            return res
         })
   
       }
       
     
     }
      }
}
