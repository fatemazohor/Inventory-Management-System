import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product, Stock, Warehouse } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit{

  title: string = "Stock list";
  title2: string = "Stock Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  stock: Stock[] = []
  searchData: Stock[] = []

  stockForm!: FormGroup
  stockModel: Stock = new Stock();

  product: Product[] = []
  warehouse: Warehouse[] = []

  constructor(private service: ProductService,
    private formBuilder: FormBuilder
  ) { }




  ngOnInit(): void {
    this.initStockForm();
    this.loadProduct();
    this.loadStock();
    this.loadWarehouse();
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
    this.service.findStockByKeyword(this.searchKeyword).subscribe({
      next: res => {
        this.searchData = res;
        this.stock = this.searchData;
        console.log(res)
      }, error: err => {
        console.log(err);
      }
    });
    // this.filterProductData(2)
  }
  //search

  initStockForm() {
    this.stockForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      productid: ['', Validators.required],
      warehouseid: ['', Validators.required],
      updatedate: [''],
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


  // all stock
  loadStock() {
    this.service.findAllStock().subscribe({
      next: res => {
        this.stock = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // delete stock
  deleteStock(dataId: number) {
    this.service.deleteStock(dataId).subscribe({
      next: res => {
        alert("Stock deleted sucessfully.");
        this.loadStock()
      },
      error: err => {
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new Stock
  onSubmit() {
    if (this.stockForm.valid) {
      const newData: Stock = this.stockForm.value;
      this.service.createStock(newData).subscribe({
        next: res => {
          alert("Stock created sucessfully.")
          this.loadStock()
          this.stockForm.reset();
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
    this.stockModel.id = datarow.id;
    this.stockForm.controls['quantity'].setValue(datarow.quantity)
    this.stockForm.controls['productid'].setValue(datarow.productid)
    this.stockForm.controls['warehouseid'].setValue(datarow.warehouseid)
    
  }

  editStock() {
    if (this.stockForm.valid) {
      this.stockModel.quantity = this.stockForm.value.quantity;
      this.stockModel.productid = this.stockForm.value.productid;
      this.stockModel.warehouseid = this.stockForm.value.warehouseid;
      
      this.service.updateStock(this.stockModel.id, this.stockModel).subscribe({
        next: res => {
          alert("Stock updated sucessfully.")
          this.loadStock()
          this.stockForm.reset()
        },
        error: err => {
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }

  filterProductData(dataid:any):any{

    let productcode:Product[] = this.product.filter(pro=>pro.id == dataid);

    let dataValue = productcode;
    console.log("product code",dataValue[0].pcode
    )
    return dataValue[0].pcode;

  }






}
