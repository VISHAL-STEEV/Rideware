import { Component, Inject, OnInit,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule   } from '@angular/forms';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-udate-inventory',
  standalone: true,
  imports: [CommonModule,MatIconModule,ReactiveFormsModule,MatDialogClose,MatInputModule,MatButtonModule],
  templateUrl: './udate-inventory.component.html',
  styleUrl: './udate-inventory.component.scss'
})
export class UdateInventoryComponent implements OnInit {


  Heading :boolean =true;
  productForm: FormGroup;
  dataUpdated: EventEmitter<any> = new EventEmitter();

  creatingProduct: boolean = false;

  constructor( private _inventoryService: InventoryService,
     private _formBuilder: FormBuilder,private dialoRef : MatDialog,
     private router: Router,@Inject(MAT_DIALOG_DATA) public data: any,
     private toastr :ToastrService
     ){}

  ngOnInit(){

    this.productForm = this._formBuilder.group({
      name: ['', Validators.required],
      shortName: ['', Validators.required]
  });
 
  
  if(this.data.update_id){
    this.Heading = false
    this.productForm.controls['name'].setValue(this.data.name);
    this.productForm.controls['shortName'].setValue(this.data.shortName);
  }
 
  
  }









submitProductForm() {


  this._inventoryService.refresh_update_data(true)



  if (this.productForm.valid && this.data.update_id) {
    const name = this.productForm.get('name').value;
    const shortName = this.productForm.get('shortName').value;
    
     const  data={
        id : this.data.update_id,
        na_me:name,
        short_Name:shortName
       }
      
 


    this._inventoryService.update_inventy(data).subscribe((res)=>{
        
       try {
        
        this._inventoryService.sentEvent();
        this.toastr.success('Data updated !!!', 'Success')
        return res;
       } catch (error) {
        this.toastr.error('Failed to add data!', 'Error');
        console.log(error)
       }
    

    })

} else {


  
      const name = this.productForm.get('name').value;
      const shortName = this.productForm.get('shortName').value;

     

      
      this._inventoryService.create_inventory_product(name,shortName).subscribe((res)=>{

        try {
         
          this._inventoryService.sentEvent();
          this.productForm.reset();
          this.toastr.success('Data added !!!', 'Success')

          return res;
   
        } catch (error) {
          this.toastr.error('Failed to add data!', 'Error');
          console.log(error)
        }
  
      })

  }
}






}
