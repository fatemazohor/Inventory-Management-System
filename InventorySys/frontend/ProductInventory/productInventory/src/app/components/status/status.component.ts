import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Status } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit{

  title: string = "Status list";
  title2: string = "Status Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  status: Status[] = []
  statusForm!: FormGroup
  statusModel: Status = new Status();

  constructor(private service:ProductService,
    private formBuilder:FormBuilder
  ){}


  ngOnInit(): void {
    this.initStatusForm();
    this.loadStatus();
  }

  initStatusForm(){
    this.statusForm = this.formBuilder.group({
      status:['',Validators.required]
    })

  }
  // all status
  loadStatus(){
    this.service.findAllStatus().subscribe({
      next:res=>{
        this.status = res;
        console.log(res);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  // delete status
  deleteStatus(dataId:number){
    this.service.deleteStatus(dataId).subscribe({
      next:res=>{
        alert("Status deleted sucessfully.");
        this.loadStatus()
      },
      error:err=>{
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new status
  onSubmit(){
    if(this.statusForm.valid){
      const newData:Status = this.statusForm.value;
      this.service.createStatus(newData).subscribe({
        next:res=>{
          alert("Status created sucessfully.")
          this.loadStatus()
          this.statusForm.reset();
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
    this.statusModel.id = datarow.id;
    this.statusForm.controls['status'].setValue(datarow.status)
  }

  editStatus(){
    if(this.statusForm.valid){
      this.statusModel.status = this.statusForm.value.status;
      this.service.updateStatus(this.statusModel.id,this.statusModel).subscribe({
        next:res=>{
          alert("Status updated sucessfully.")
          this.loadStatus()
          this.statusForm.reset()
        },
        error:err=>{
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }






}
