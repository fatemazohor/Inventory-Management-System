import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  title: string = "Categories list";
  title2: string = "Categories Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  cate: Category[] = []
  cateForm!: FormGroup
  cateModel: Category = new Category();

  constructor(private service:ProductService,
    private formBuilder:FormBuilder
  ){}


  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategory();
  }

  initCategoryForm(){
    this.cateForm = this.formBuilder.group({
      cname:['',Validators.required]
    })
  }
  // all category
  loadCategory(){
    this.service.findAllCategory().subscribe({
      next:res=>{
        this.cate = res;
        console.log(res);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  // delete category
  deleteCategory(cateId:number){
    this.service.deleteCategory(cateId).subscribe({
      next:res=>{
        alert("Category deleted sucessfully.");
        this.loadCategory()
      },
      error:err=>{
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new category
  onSubmit(){
    if(this.cateForm.valid){
      const cateData:Category = this.cateForm.value;
      this.service.createCategory(cateData).subscribe({
        next:res=>{
          alert("Category created sucessfully.")
          this.loadCategory()
          this.cateForm.reset();
        },
        error:err=>{
          alert("Data not deleted")
          console.log(err);
        }
      })
    }
  }
  onEditById(caterow:any){
    this.menuType = false;
    this.cateModel.id = caterow.id;
    this.cateForm.controls['cname'].setValue(caterow.cname)
  }

  editCategory(){
    if(this.cateForm.valid){
      this.cateModel.cname = this.cateForm.value.cname;
      this.service.updateBook(this.cateModel.id,this.cateModel).subscribe({
        next:res=>{
          alert("Category updated sucessfully.")
          this.loadCategory()
          this.cateForm.reset()
        },
        error:err=>{
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }




}
