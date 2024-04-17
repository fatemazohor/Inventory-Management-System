import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{


  title: string = "Book list";
  title2: string = "Book Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  books: Book[] = []
  bookForm!: FormGroup
  bookModel: Book = new Book();

  constructor(private service:ProductService,
    private formBuilder:FormBuilder
  ){}


  ngOnInit(): void {
    this.initBookForm();
    this.loadBook();
  }

  initBookForm(){
    this.bookForm = this.formBuilder.group({
      name:['',Validators.required],
      price:['',Validators.required],
      dept_id:['',Validators.required],
    })
  }

  //all book
  loadBook(){
    this.service.getAllBook().subscribe({
      next:res=>{
        this.books = res;
        console.log(res);
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  //delete book
  deleteBook(bookId:number){
    this.service.deleteBook(bookId).subscribe({
      next:res=>{
        alert("book deleted sucessfully.");
        this.loadBook()
      },
      error:err=>{
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new book
  onSubmit(){
    if(this.bookForm.valid){
      const bookData:Book = this.bookForm.value;
      this.service.createBook(bookData).subscribe({
        next:res=>{
          alert("Book created sucessfully.")
          this.loadBook()
          this.bookForm.reset();
        },
        error:err=>{
          alert("Data not deleted")
          console.log(err);
        }
      })
    }
  }
  onEditById(bookrow:any){}

  editbook(){}



}
