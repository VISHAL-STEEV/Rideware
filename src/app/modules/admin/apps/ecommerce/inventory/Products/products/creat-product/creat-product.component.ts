import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { InventoryService } from '../../../inventory.service';
import { InventoryProductsService } from '../../../inventory-products.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-creat-product',
  standalone: true,
  imports: [CommonModule,MatChipsModule,MatButtonModule,MatStepperModule,
            FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,
            MatDividerModule,MatSelectModule,
            MatSlideToggleModule],
  templateUrl: './creat-product.component.html',
  styleUrl: './creat-product.component.scss'
})
export class CreatProductComponent implements OnInit{
  productData: any;
  inputValue: number = 0;
  isLinear: boolean;
  Item_id_data:any;
  products_groups_all_data:any[];
  products_Categories_all_data:any[]
  Drop_down_units:any[];
  Product_Form: FormGroup;
  isAvailableInPOS_value:boolean =false;
  thirdFormGroup: FormGroup;
  Item_id: any;
firstFormGroup = this._formBuilder.group({
  firstCtrl: ['', Validators.required],
  canBeSale: [false], 
  canBePurchase: [false] 
});
secondFormGroup = this._formBuilder.group({
  Tax_Percentage: ['', Validators.required],
  Max_Quantity: ['', Validators.required],
  Min_Quantity: ['', Validators.required],
  Product_Tracking:['', Validators.required]
});

ForthFormGroup = this._formBuilder.group({
  Purchase_Measure: ['', Validators.required],
  Purchase_Price:['', Validators.required]
});

firstFormGroup_General =this._formBuilder.group({
  Description: ['', Validators.required],
  Referance :['', Validators.required],
  Barcode:['', Validators.required],
  Product_Group:['', Validators.required],
  Internal_Referance:['', Validators.required],
  product_Category:['', Validators.required]

});


ThirdFormGroup= this._formBuilder.group({
  Sales_Unit_Measure:['', Validators.required],
  Sales_Unit_Price:['', Validators.required],
  isAvailableInPOS_value:[false],
});
 









constructor(private _formBuilder: FormBuilder,private _inven_products_grp:InventoryProductsService,
             private _inventoryService :InventoryService,private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.Update_data_useing_id();
  this.Drop_Down_Display_Data();
  }


increment() {

  const toggle_value  =this.ThirdFormGroup.value.isAvailableInPOS_value

  if(toggle_value === undefined){

    this.ThirdFormGroup.get('isAvailableInPOS_value').setValue(false); 

  }

 const units_data ={
  "productName": this.firstFormGroup.value.firstCtrl,
  "description": this.firstFormGroup_General.value.Description,
  "internalReferance": this.firstFormGroup_General.value.Internal_Referance,
  "productGroupId": this.firstFormGroup_General.value.Product_Group,
  "barcode": this.firstFormGroup_General.value.Barcode,
  "taxPercentage": this.secondFormGroup.value.Tax_Percentage,
  "minQuantity": this.secondFormGroup.value.Min_Quantity,
  "maxQuantity": this.secondFormGroup.value.Min_Quantity,
  "reOrderQuantity": 0,
  "isSales": this.firstFormGroup.value.canBeSale,
  "isPurchase": this.firstFormGroup.value.canBePurchase,
  "isAvailableInPOS": this.ThirdFormGroup.value.isAvailableInPOS_value,
  "productCategoryId": this.firstFormGroup_General.value.product_Category,
  "productTracking": 3,
  "unitId": this.firstFormGroup_General.value.Referance,
  "salesPrice": this.ThirdFormGroup.value.Sales_Unit_Price,
  "purchasePrice": this.ForthFormGroup.value.Purchase_Price ,
  "costPrice": 0
}





if(this.Item_id){
  this._inven_products_grp.UpdateProduct(units_data,this.Item_id).subscribe(res=>{
    return res
});
}else{
  this._inven_products_grp.Create_product(units_data).subscribe(res=>{
    return res
});
}


}








Drop_Down_Display_Data(){
  
  this._inven_products_grp.get_groups().subscribe((res)=>{
       this.products_groups_all_data = res.data.result
  })

  this._inven_products_grp.get_Categories().subscribe((res)=>{
       this.products_Categories_all_data = res.data.result
  });


  this._inventoryService.get_units().subscribe((res)=>{
    this.Drop_down_units = res.data.result;
});
}





Update_data_useing_id(){
  this.route.paramMap.subscribe(params => {
    if(params){
      this.Item_id = params.get('id')
      
      if(this.Item_id){
        this._inven_products_grp.GetProductDetailsById(this.Item_id).subscribe(res=>{
          this.Item_id_data = res;
          this.firstFormGroup.controls['firstCtrl'].setValue(this.Item_id_data.data.productName);
          // this.secondFormGroup.controls['Tax_Percentage'].setValue(this.Item_id_data.data.taxPercentage);
          // this.secondFormGroup.controls['Referance'].setValue(this.Item_id_data.data.productName);
          // this.secondFormGroup.controls['Max_Quantity'].setValue(this.Item_id_data.data.maxQuantity);
          // this.secondFormGroup.controls['Min_Quantity'].setValue(this.Item_id_data.data.minQuantity);
          // this.firstFormGroup_General.controls['Description'].setValue(this.Item_id_data.data.description);
          // this.firstFormGroup_General.controls['Referance'].setValue(this.Item_id_data.data.productName);
          // this.firstFormGroup_General.controls['Barcode'].setValue(this.Item_id_data.data.barcode);
          // this.firstFormGroup_General.controls['Internal_Referance'].setValue(this.Item_id_data.data.productName);
       })
      }
        
    
    }
  });
}




}



