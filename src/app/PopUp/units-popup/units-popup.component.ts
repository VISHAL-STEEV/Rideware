import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';




@Component({
  selector: 'app-units-popup',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,ReactiveFormsModule,
    MatInputModule,FormsModule,MatSelectModule,MatButtonModule
    ,MatDialogClose],
  templateUrl: './units-popup.component.html',
  styleUrl: './units-popup.component.scss'
})
export class UnitsPopupComponent implements OnInit {

  Drop_down_category:any[];
 
  disable_inp:boolean =false;
  factor_BaseRatio: number =1.0 ;
  Display_name:string="";
  unitForm: FormGroup;
  isFactorBaseRatioDisabled:boolean = true ;
  unit_Category_id:any;
  unit_id:any;
  unit_Type:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , 
            private _inventoryService: InventoryService,
            private formBuilder: FormBuilder ){}
  ngOnInit(): void {

    this.unitForm = this.formBuilder.group({
      Display_name: ['', Validators.required],
      selectedUnitType: ['', Validators.required],
      factor_BaseRatio: [{ value: '', disabled: false }, Validators.required],
      selected_UnitType:['', Validators.required],
     
    });
    
  this._inventoryService.get_units().subscribe((res)=>{
      this.Drop_down_category = res.data.result;
  });



 if(this.data){
  this.unit_id =this.data.id
  this.unitForm.controls['Display_name'].setValue(this.data.name);
  this.unitForm.controls['selectedUnitType'].setValue(this.data.unitCategoryName);
  this.unitForm.controls['selected_UnitType'].setValue(this.data.unitTypeName);
  this.unitForm.controls['factor_BaseRatio'].setValue(this.data.factorBaseRatio);
   if(this.data.unitTypeName === 'Reference Unit of Measure for this category'){
      this.unitForm.controls['factor_BaseRatio'].setValue(1.0);
       this.unitForm.get('factor_BaseRatio').disable();
   }
     
 }
   
  
 
   
  }



  get_id(id:any){

this.unit_Category_id = id;
    
  }




  updateFactorBase() {
   
    if (this.unitForm.value.selected_UnitType === 'Reference Unit of Measure for this category') {
      this.unit_Type =1;
      this.unitForm.controls['factor_BaseRatio'].setValue(1.0);
      this.unitForm.get('factor_BaseRatio').disable();
     
    } else if(this.unitForm.value.selected_UnitType === 'Smaller than the reference Unit of Measure'){
      this.unit_Type=0;
      this.unitForm.get('factor_BaseRatio').enable();
    }else if(this.unitForm.value.selected_UnitType === 'Bigger than the reference Unit of Measure'){
      this.unit_Type =2;
      this.unitForm.get('factor_BaseRatio').enable();
    }

  }
  
 

  Create_Update_Data(){

   

    if(this.data){

      const data ={
        "id": this.unit_id ,
        "name": this.unitForm.value.Display_name,
        "factorBaseRatio": this.unitForm.value.factor_BaseRatio,
        "unitType": this.unit_Type,
        
      };

      this._inventoryService.Inventory_UpdateUnit(data).subscribe((res)=>{
        this._inventoryService.sentEvent();
        return res;
      });
      
    

    }else{
      const data ={
        
        "name": this.unitForm.value.Display_name,
        "factorBaseRatio": this.unitForm.value.factor_BaseRatio,
        "unitType": this.unit_Type,
        "unitCategoryid": this.unit_Category_id
        
      };


  
      this._inventoryService.Inventory_CreateUnit(data).subscribe((res)=>{
        this._inventoryService.sentEvent();
        return res;
      });

    }
   
  }


}
