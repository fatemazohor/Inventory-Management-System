import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Customer, Order, Product, Status, Vendor } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  title: string = "Orders list";
  title2: string = "Orders Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  order: Order[] = []
  searchData: Order[] = []

  orderForm!: FormGroup
  orderModel: Order = new Order();

  vendor: Vendor[] = []
  product: Product[] = []
  status: Status[] = []

  constructor(private service: ProductService,
    private formBuilder: FormBuilder
  ) { }




  ngOnInit(): void {
    this.initOrderForm();
    this.loadProduct();
    this.loadOrder();
    this.loadStatus();
    this.loadVendor();
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
    let idproduct:string ='';
    if(this.searchKeyword){
      // take product code to change it to id
    let productcode:Product[] = this.product.filter(pro=>pro.pcode?.toUpperCase() == this.searchKeyword.toUpperCase());

    
    let dataValue = productcode;
      idproduct = (dataValue[0].id).toString() ?? '';
    
    //......id

    }else{
      idproduct = this.searchKeyword;

    }
    

    // console.log('keyoword', dataValue[0].id);
    this.service.findOrderByKeyword(idproduct).subscribe({
      next: res => {
        this.searchData = res;
        this.order = this.searchData;
        console.log(res)
      }, error: err => {
        console.log(err);
      }
    });
  }
  //search

  initOrderForm() {
    this.orderForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      productid: ['', Validators.required],
      statusid: ['', Validators.required],
      unit_price: ['', Validators.required],
      total_price: ['', Validators.required],
      vendorid: ['', Validators.required],
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

  //all vendor
  loadVendor() {
    this.service.findAllVendor().subscribe({
      next: res => {
        this.vendor = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
   }



  // all order
  loadOrder() {
    this.service.findAllOrder().subscribe({
      next: res => {
        this.order = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // delete order
  deleteOrder(dataId: number) {
    this.service.deleteOrder(dataId).subscribe({
      next: res => {
        alert("Order deleted sucessfully.");
        this.loadOrder()
      },
      error: err => {
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new Order
  onSubmit() {
    if (this.orderForm.valid) {
      const newData: Order = this.orderForm.value;
      this.service.createOrder(newData).subscribe({
        next: res => {
          alert("Order created sucessfully.")
          this.loadOrder()
          this.orderForm.reset();
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
    this.orderModel.id = datarow.id;
    this.orderForm.controls['quantity'].setValue(datarow.quantity)
    this.orderForm.controls['productid'].setValue(datarow.productid)
    this.orderForm.controls['statusid'].setValue(datarow.statusid)
    this.orderForm.controls['unit_price'].setValue(datarow.unit_price)
    this.orderForm.controls['total_price'].setValue(datarow.total_price)
    this.orderForm.controls['vendorid'].setValue(datarow.vendorid)
  }

  editOrder() {
    if (this.orderForm.valid) {
      this.orderModel.quantity = this.orderForm.value.quantity;
      this.orderModel.productid = this.orderForm.value.productid;
      this.orderModel.statusid = this.orderForm.value.statusid;
      this.orderModel.unit_price = this.orderForm.value.unit_price;
      this.orderModel.total_price = this.orderForm.value.total_price;
      this.orderModel.vendorid = this.orderForm.value.vendorid;
      this.service.updateOrder(this.orderModel.id, this.orderModel).subscribe({
        next: res => {
          alert("Order updated sucessfully.")
          this.loadOrder()
          this.orderForm.reset()
        },
        error: err => {
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }

  //filter for product name
  filterProductData(dataid:any):any{

    let productcode:Product[] = this.product.filter(pro=>pro.id == dataid);

    let dataValue = productcode;
    // console.log("product code",dataValue[0].pcode)
    return dataValue[0].pcode;

  }
  filterVendorData(dataid:any):any{

    let vendor:Vendor[] = this.vendor.filter(pro=>pro.id == dataid);

    let dataValue = vendor;
    // console.log("Vendor",dataValue[0].company)
    return dataValue[0].company;

  }
  //filter status
  filterStatusData(dataid:any):any{

    let status:Status[] = this.status.filter(pro=>pro.id == dataid);

    let dataValue = status;
    // console.log("product code",dataValue[0].status)
    return dataValue[0].status;

  }

  updateUnitPrice(){
    let idproduct = this.orderForm.value.productid;

    let productcode:Product[] = this.product.filter(pro=>pro.id == idproduct);

    let dataValue = productcode;
    console.log("update price ",dataValue[0].price
    )
    this.orderForm.controls['unit_price'].setValue(dataValue[0].price);
    

  }

  calculate(){
    let quantity = this.orderForm.value.quantity;
    let price = this.orderForm.value.unit_price;

    let total = quantity*price;
    console.log("total price",total)
    this.orderForm.controls['total_price'].setValue(total);
  }




}
