import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Customer, Delivery, Order, Product, Status, Vendor } from '../../model/inventory.model';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrl: './main-wrapper.component.css'
})
export class MainWrapperComponent implements OnInit {

  order: Order[] = []
  delivery: Delivery[] = []
  vendor: Vendor[] = []
  customer: Customer[] = []
  product: Product[] = []
  status: Status[] = []

  totalSaleOrder: any;
  totalSaleDelivery: any;
  revenue: any;

  constructor(private service: ProductService) { }
  ngOnInit(): void {
    this.loadOrder();
    this.loadProduct();
    this.loadVendor();
    this.loadStatus();
    this.loadDelivery();
    this.loadCustomer();
    this.gettotalSaleOrder();
    this.gettotalSaleDelivery();
    
  }

  // all order
  loadOrder() {
    this.service.findLatestOrder().subscribe({
      next: res => {
        this.order = res;
        // console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  // all delivery
  loadDelivery() {
    this.service.findLatestDelivery().subscribe({
      next: res => {
        this.delivery = res;
        // console.log(res);
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
        // console.log(res);
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
        // console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //all vendor
  loadVendor() {
    this.service.findAllVendor().subscribe({
      next: res => {
        this.vendor = res;
        // console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //all customer
  loadCustomer() {
    this.service.findAllCustomer().subscribe({
      next: res => {
        this.customer = res;
        // console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }



  //filter for product name
  filterProductData(dataid: any): any {

    let productcode: Product[] = this.product.filter(pro => pro.id == dataid);

    let dataValue = productcode;
    // console.log("product code",dataValue[0].pcode)
    return dataValue[0].pcode;

  }
  filterVendorData(dataid: any): any {

    let vendor: Vendor[] = this.vendor.filter(pro => pro.id == dataid);

    let dataValue = vendor;
    // console.log("Vendor",dataValue[0].company)
    return dataValue[0].company;

  }
  filterCustomerData(dataid: any): any {

    let cust: Customer[] = this.customer.filter(pro => pro.id == dataid);

    let dataValue = cust;
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

  // get total purchase amount
  gettotalSaleOrder() {
    this.service.findTotalOrder().subscribe({
      next: (res: any) => {
        // Extract sum from the response
        let sum = res[0]['sum(total_price)']
        this.totalSaleOrder = sum;
       this.setRevenue();
        // console.log(res);
        // console.log(sum);

      },
      error: err => {
        console.log(err);

      }
    })

  }
  // get total Sales amount
  gettotalSaleDelivery() {
   this.service.findTotalDelivery().subscribe({
      next: (res: any) => {
        // Extract sum from the response
        let sum = res[0]['sum(total_price)']
        this.totalSaleDelivery = sum;
        this.setRevenue();
        // console.log(res);
        // console.log(sum);

      },
      error: err => {
        console.log(err);

      }
    });
    

  }


  setRevenue() {
    let sale: number = this.totalSaleDelivery;
    let purchase: number = this.totalSaleOrder;
    console.log("revenue", sale, purchase);
    if (sale != null && purchase != null) {
      this.revenue = this.findRevenue(sale, purchase)

    } else {
      this.revenue = 0;
    }
  }

  findRevenue(sale: number, purchase: number) {
    let revenue = (sale - purchase) * 100 / (purchase);
    return revenue.toFixed(2);

  }





}
