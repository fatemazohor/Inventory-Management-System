import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category, Product } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  title: string = "Products list";
  title2: string = "Products Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  product: Product[] = []
  searchProduct: Product[] = []
  productForm!: FormGroup
  productModel: Product = new Product();

  cate: Category[] = []

  constructor(private service: ProductService,
    private formBuilder: FormBuilder
  ) { }




  ngOnInit(): void {
    this.initProductForm();
    this.loadProduct();
    this.loadCategory();
  }


  // search form create
  searchKeyword: string = '';
  searchForm = this.formBuilder.nonNullable.group({
    searchValue: '',
  })

  //search function
  onSearchSubmit(): void {

    console.log("searchValue", this.searchForm.value);
    this.searchKeyword = this.searchForm.value.searchValue ?? '';
    console.log('keyoword', this.searchKeyword);
    this.service.findProductByKeyword(this.searchKeyword).subscribe({
      next: res => {
        this.searchProduct = res;
        this.product = this.searchProduct;
        console.log(res)
      }, error: err => {
        console.log(err);
      }
    });
  }
  //search

  // all category
  loadCategory() {
    this.service.findAllCategory().subscribe({
      next: res => {
        this.cate = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  initProductForm() {
    this.productForm = this.formBuilder.group({
      pname: ['', Validators.required],
      pcode: ['', Validators.required],
      pcate: ['', Validators.required],
      price: ['', Validators.required],
      createdate: [''],
    })
  }
  // all product
  loadProduct() {
    this.service.findAllProduct().subscribe({
      next: res => {
        this.product = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // delete product
  deleteProduct(dataId: number) {
    this.service.deleteProduct(dataId).subscribe({
      next: res => {
        alert("Product deleted sucessfully.");
        this.loadProduct()
      },
      error: err => {
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new Product
  onSubmit() {
    if (this.productForm.valid) {
      const newData: Product = this.productForm.value;
      this.service.createProduct(newData).subscribe({
        next: res => {
          alert("Product created sucessfully.")
          this.loadProduct()
          this.productForm.reset();
        },
        error: err => {
          alert("Data not deleted")
          console.log(err);
        }
      })
    }
  }

  onEditById(datarow: any) {
    this.menuType = false;
    this.productModel.id = datarow.id;
    this.productForm.controls['pname'].setValue(datarow.pname)
    this.productForm.controls['pcode'].setValue(datarow.pcode)
    this.productForm.controls['pcate'].setValue(datarow.pcate)
    this.productForm.controls['price'].setValue(datarow.price)
  }

  editProduct() {
    if (this.productForm.valid) {
      this.productModel.pname = this.productForm.value.pname;
      this.productModel.pcode = this.productForm.value.pcode;
      this.productModel.pcate = this.productForm.value.pcate;
      this.productModel.price = this.productForm.value.price;
      this.service.updateProduct(this.productModel.id, this.productModel).subscribe({
        next: res => {
          alert("Product updated sucessfully.")
          this.loadProduct()
          this.productForm.reset()
        },
        error: err => {
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }





}
