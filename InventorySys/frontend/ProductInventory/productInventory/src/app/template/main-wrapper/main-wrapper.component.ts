import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Order, Product, Status, Vendor } from '../../model/inventory.model';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrl: './main-wrapper.component.css'
})
export class MainWrapperComponent implements OnInit{

  order: Order[] = []
  vendor: Vendor[] = []
  product: Product[] = []
  status: Status[] = []

  constructor(private service: ProductService){}
  ngOnInit(): void {
    this.loadOrder();
    this.loadProduct();
    this.loadVendor();
    this.loadStatus();
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



  

}
