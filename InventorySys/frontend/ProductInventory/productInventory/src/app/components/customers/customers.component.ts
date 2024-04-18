import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Customer } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

  title: string = "Customers list";
  title2: string = "Customers Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  customer: Customer[] = []
  searchData: Customer[] = []

  customerForm!: FormGroup
  customerModel: Customer = new Customer();



  constructor(private service: ProductService,
    private formBuilder: FormBuilder
  ) { }




  ngOnInit(): void {
    this.initCustomerForm();
    this.loadCustomer();

  }



  initCustomerForm() {
    this.customerForm = this.formBuilder.group({ 
      address: ['', Validators.required],
      phone: ['', Validators.required],
      customer_name: ['', Validators.required],
      email: ['', Validators.required]
    })

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
    this.service.findCustomerByKeyword(this.searchKeyword).subscribe({
      next: res => {
        this.searchData = res;
        this.customer = this.searchData;
        console.log(res)
      }, error: err => {
        console.log(err);
      }
    });
  }
  //search

  //all vendor
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

  // delete customer
  deleteCustomer(dataId: number) {
    this.service.deleteCustomer(dataId).subscribe({
      next: res => {
        alert("Customer deleted sucessfully.");
        this.loadCustomer()
      },
      error: err => {
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new Customer
  onSubmit() {
    if (this.customerForm.valid) {
      const newData: Customer = this.customerForm.value;
      this.service.createCustomer(newData).subscribe({
        next: res => {
          alert("Customer created sucessfully.")
          this.loadCustomer()
          this.customerForm.reset();
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
    this.customerModel.id = datarow.id;
    this.customerForm.controls['address'].setValue(datarow.address)
    this.customerForm.controls['phone'].setValue(datarow.phone)
    this.customerForm.controls['customer_name'].setValue(datarow.customer_name)
    this.customerForm.controls['email'].setValue(datarow.email)
  }

  editCustomer() {
    if (this.customerForm.valid) {
      this.customerModel.address = this.customerForm.value.address;
      this.customerModel.phone = this.customerForm.value.phone;
      this.customerModel.customer_name = this.customerForm.value.customer_name;
      this.customerModel.email = this.customerForm.value.email;
      this.service.updateCustomer(this.customerModel.id, this.customerModel).subscribe({
        next: res => {
          alert("Customer updated sucessfully.")
          this.loadCustomer()
          this.customerForm.reset()
        },
        error: err => {
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }






}
