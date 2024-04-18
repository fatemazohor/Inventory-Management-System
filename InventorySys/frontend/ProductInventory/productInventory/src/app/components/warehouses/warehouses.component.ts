import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Warehouse } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.css'
})
export class WarehousesComponent implements OnInit{

  title: string = "Warehouses list";
  title2: string = "Warehouses Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  warehouse: Warehouse[] = []
  wareForm!: FormGroup
  wareModel: Warehouse = new Warehouse();

  constructor(private service:ProductService,
    private formBuilder:FormBuilder
  ){}


  ngOnInit(): void {
    this.initWarehouseForm();
    this.loadWarehouse();
  }

  initWarehouseForm(){
    this.wareForm = this.formBuilder.group({
      wname:['',Validators.required]
    })
  }
  // all warehouse
  loadWarehouse(){
    this.service.findAllWarehouse().subscribe({
      next:res=>{
        this.warehouse = res;
        console.log(res);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  // delete warehouse
  deleteWarehouse(dataId:number){
    this.service.deleteWarehouse(dataId).subscribe({
      next:res=>{
        alert("Warehouse deleted sucessfully.");
        this.loadWarehouse()
      },
      error:err=>{
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new Warehouse
  onSubmit(){
    if(this.wareForm.valid){
      const newData:Warehouse = this.wareForm.value;
      this.service.createWarehouse(newData).subscribe({
        next:res=>{
          alert("Warehouse created sucessfully.")
          this.loadWarehouse()
          this.wareForm.reset();
        },
        error:err=>{
          alert("Data not deleted")
          console.log(err);
        }
      })
    }
  }

  onEditById(datarow:any){
    this.menuType = false;
    this.wareModel.id = datarow.id;
    this.wareForm.controls['wname'].setValue(datarow.wname)
  }

  editWarehouse(){
    if(this.wareForm.valid){
      this.wareModel.wname = this.wareForm.value.wname;
      this.service.updateWarehoue(this.wareModel.id,this.wareModel).subscribe({
        next:res=>{
          alert("Warehouse updated sucessfully.")
          this.loadWarehouse()
          this.wareForm.reset()
        },
        error:err=>{
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }



}
