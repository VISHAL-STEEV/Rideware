import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { InventoryProductsService } from 'app/modules/admin/apps/ecommerce/inventory/inventory-products.service';


@Component({
  selector: 'app-group-pop-up',
  standalone: true,
  imports: [CommonModule,MatIconModule,ReactiveFormsModule,MatDialogClose,
    MatInputModule,MatButtonModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './group-pop-up.component.html',
  styleUrl: './group-pop-up.component.scss'
})
export class GroupPopUpComponent implements OnInit {

  Heading: any;
  selected: any;
  Product_Group:any[];
  isDisabled:boolean=true;

  constructor(private _inven_products_grp : InventoryProductsService,
    private _formBuilder: FormBuilder,private dialoRef : MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr :ToastrService
    ){}


ngOnInit(): void {
   this.get_grop();

   
   if(this.data){

     console.log(this.data)

    this.product_Group_form.controls['name'].setValue(this.data.name);
    this.product_Group_form.controls['Description'].setValue(this.data.description);
    this.isDisabled = false;
    
    
}
}





product_Group_form = this._formBuilder.group({
  name: ['', Validators.required],
  Description: ['', Validators.required],
  Product_Group:['', Validators.required]
});



get_grop(){
  this._inven_products_grp.get_groups().subscribe((res)=>{
   
       this.Product_Group = res.data.result
  })
}




submitProductForm() {
  console.log(this.product_Group_form.value);
  if(this.data){
    
    const data =  this.product_Group_form.value
   
    this._inven_products_grp.UpdateProductCategory(data,this.data.id).subscribe((res)=>{
      // this._inventoryService.sentEvent();
  
       return res
    })
    
  }else{

    if(this.product_Group_form.value.name ==="" || this.product_Group_form.value.Description ===""){
      this.toastr.warning("please enter valid data")
    }else{

      const data =  this.product_Group_form.value;
  
      this._inven_products_grp.CreateProductCategory(data).subscribe((res)=>{
          // this._inventoryService.sentEvent();
         return res
      })

    }
    
  
  }
  }
  


}
