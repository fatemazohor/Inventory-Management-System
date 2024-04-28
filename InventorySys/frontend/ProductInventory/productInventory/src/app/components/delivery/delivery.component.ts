import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Customer, Delivery, Product, Status } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit {

  title: string = "Delivery list";
  title2: string = "Delivery Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  delivery: Delivery[] = []
  searchData: Delivery[] = []

  deliveryForm!: FormGroup
  deliveryModel: Delivery = new Delivery();

  customer: Customer[] = []
  product: Product[] = []
  status: Status[] = []

  constructor(private service: ProductService,
    private formBuilder: FormBuilder
  ) { }




  ngOnInit(): void {
    this.initDeliveryForm();
    this.loadProduct();
    this.loadDelivery();
    this.loadStatus();
    this.loadCustomer();
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
    let idproduct: string = '';
    if (this.searchKeyword) {
      // take product code to change it to id
      let productcode: Product[] = this.product.filter(pro => pro.pcode?.toUpperCase() == this.searchKeyword.toUpperCase());


      let dataValue = productcode;
      idproduct = (dataValue[0].id).toString() ?? '';

      //......id

    } else {
      idproduct = this.searchKeyword;

    }


    // console.log('keyoword', dataValue[0].id);
    this.service.findDeliveryByKeyword(idproduct).subscribe({
      next: res => {
        this.searchData = res;
        this.delivery = this.searchData;
        console.log(res)
      }, error: err => {
        console.log(err);
      }
    });
  }
  //search


  initDeliveryForm() {
    this.deliveryForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      productid: ['', Validators.required],
      statusid: ['', Validators.required],
      unit_price: ['', Validators.required],
      total_price: ['', Validators.required],
      deliverydate: ['', Validators.required],
      customerid: ['', Validators.required],
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
  loadStatus() {
    this.service.findAllStatus().subscribe({
      next: res => {
        this.status = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // all customer
  loadCustomer() {
    this.service.findAllCustomer().subscribe({
      next: res => {
        this.customer = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // all delivery
  loadDelivery() {
    this.service.findAllDelivery().subscribe({
      next: res => {
        this.delivery = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // delete delivery
  deleteDelivery(dataId: number) {
    this.service.deleteDelivery(dataId).subscribe({
      next: res => {
        alert("Delivery deleted sucessfully.");
        this.loadDelivery()
      },
      error: err => {
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new Delivery
  onSubmit() {
    if (this.deliveryForm.valid) {
      const newData: Delivery = this.deliveryForm.value;
      this.service.createDelivery(newData).subscribe({
        next: res => {
          alert("Delivery created sucessfully.")
          this.loadDelivery()
          this.deliveryForm.reset();
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
    this.deliveryModel.id = datarow.id;
    this.deliveryForm.controls['quantity'].setValue(datarow.quantity)
    this.deliveryForm.controls['productid'].setValue(datarow.productid)
    this.deliveryForm.controls['statusid'].setValue(datarow.statusid)
    this.deliveryForm.controls['unit_price'].setValue(datarow.unit_price)
    this.deliveryForm.controls['total_price'].setValue(datarow.total_price)
    this.deliveryForm.controls['customerid'].setValue(datarow.customerid)
    this.deliveryForm.controls['deliverydate'].setValue(datarow.deliverydate)
  }

  editDelivery() {
    if (this.deliveryForm.valid) {
      this.deliveryModel.quantity = this.deliveryForm.value.quantity;
      this.deliveryModel.productid = this.deliveryForm.value.productid;
      this.deliveryModel.statusid = this.deliveryForm.value.statusid;
      this.deliveryModel.unit_price = this.deliveryForm.value.unit_price;
      this.deliveryModel.total_price = this.deliveryForm.value.total_price;
      this.deliveryModel.customerid = this.deliveryForm.value.customerid;
      this.deliveryModel.deliverydate = this.deliveryForm.value.deliverydate;
      this.service.updateDelivery(this.deliveryModel.id, this.deliveryModel).subscribe({
        next: res => {
          alert("Order updated sucessfully.")
          this.loadDelivery()
          this.deliveryForm.reset()
        },
        error: err => {
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }

  //filter for product name
  filterProductData(dataid: any): any {

    let productcode: Product[] = this.product.filter(pro => pro.id == dataid);

    let dataValue = productcode;
    // console.log("product code",dataValue[0].pcode)
    return dataValue[0].pcode;

  }
  filterCustomerData(dataid: any): any {

    let customer: Customer[] = this.customer.filter(pro => pro.id == dataid);

    let dataValue = customer;
    // console.log("Vendor",dataValue[0].company)
    return dataValue[0].customer_name;

  }
  //filter status
  filterStatusData(dataid: any): any {

    let status: Status[] = this.status.filter(pro => pro.id == dataid);

    let dataValue = status;
    // console.log("product code",dataValue[0].status)
    return dataValue[0].status;

  }
// unit price to set on data forms
  updateUnitPrice() {
    let idproduct = this.deliveryForm.value.productid;

    let productcode: Product[] = this.product.filter(pro => pro.id == idproduct);


    let dataValue = productcode;
    let unitPrice = dataValue[0].price;
    if (unitPrice != undefined) {
      let newUnitPrice = unitPrice * (110 / 100);
      console.log("update price ", dataValue[0].price
      )
      this.deliveryForm.controls['unit_price'].setValue(newUnitPrice.toFixed(2));
    }

  }

  calculate() {
    let quantity = this.deliveryForm.value.quantity;
    let price = this.deliveryForm.value.unit_price;

    let total = quantity * price;
    console.log("total price", total)
    this.deliveryForm.controls['total_price'].setValue(total);
  }




}
