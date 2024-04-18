import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Vendor } from '../../model/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent implements OnInit {

  title: string = "Vendors list";
  title2: string = "Vendors Entry Form";
  menuType: boolean = true;
  //font awesome
  fatrash = faTrash
  editicon = faPenToSquare

  vendor: Vendor[] = []
  searchData: Vendor[] = []

  vendorForm!: FormGroup
  vendorModel: Vendor = new Vendor();



  constructor(private service: ProductService,
    private formBuilder: FormBuilder
  ) { }




  ngOnInit(): void {
    this.initVendorForm();
    this.loadVendor();

  }



  initVendorForm() {
    this.vendorForm = this.formBuilder.group({ 
      address: ['', Validators.required],
      cell: ['', Validators.required],
      contact_person: ['', Validators.required],
      company: ['', Validators.required],
      email: [''],
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
    this.service.findVendorByKeyword(this.searchKeyword).subscribe({
      next: res => {
        this.searchData = res;
        this.vendor = this.searchData;
        console.log(res)
      }, error: err => {
        console.log(err);
      }
    });
  }
  //search

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

  // delete vendor
  deleteVendor(dataId: number) {
    this.service.deleteVendor(dataId).subscribe({
      next: res => {
        alert("Vendor deleted sucessfully.");
        this.loadVendor()
      },
      error: err => {
        alert("Data not deleted");
        console.log(err);
      }
    })
  }
  //create new Vendor
  onSubmit() {
    if (this.vendorForm.valid) {
      const newData: Vendor = this.vendorForm.value;
      this.service.createVendor(newData).subscribe({
        next: res => {
          alert("Vendor created sucessfully.")
          this.loadVendor()
          this.vendorForm.reset();
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
    this.vendorModel.id = datarow.id;
    this.vendorForm.controls['address'].setValue(datarow.address)
    this.vendorForm.controls['cell'].setValue(datarow.cell)
    this.vendorForm.controls['contact_person'].setValue(datarow.contact_person)
    this.vendorForm.controls['company'].setValue(datarow.company)
    this.vendorForm.controls['email'].setValue(datarow.email)
  }

  editVendor() {
    if (this.vendorForm.valid) {
      this.vendorModel.address = this.vendorForm.value.address;
      this.vendorModel.cell = this.vendorForm.value.cell;
      this.vendorModel.contact_person = this.vendorForm.value.contact_person;
      this.vendorModel.company = this.vendorForm.value.company;
      this.vendorModel.email = this.vendorForm.value.email;
      this.service.updateVendor(this.vendorModel.id, this.vendorModel).subscribe({
        next: res => {
          alert("Vendor updated sucessfully.")
          this.loadVendor()
          this.vendorForm.reset()
        },
        error: err => {
          alert("Data not updated.")
          console.log(err);
        }
      })
    }
  }




}
