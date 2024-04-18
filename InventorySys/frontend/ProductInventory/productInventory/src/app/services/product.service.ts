import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book, Warehouse, Category, Product, Status, Customer, Vendor, Stock } from '../model/inventory.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001"

  constructor(private http:HttpClient) { }


  //---------------------------------------- INVENTORY ---------------------------------------

  //status
  findAllStatus():Observable<Status[]>{
    return this.http.get<Status[]>(`${this.baseUrl}/status/`);
  }
  findStatusById(id:number):Observable<Status>{
    return this.http.get<Status>(`${this.baseUrl}/status/${id}`);
  }
  createStatus(status:Status):Observable<Status>{
    return this.http.post<Status>(`${this.baseUrl}/status`,status);
  }

  updateStatus(id:number,status:Status):Observable<Status>{
    return this.http.patch<Status>(`${this.baseUrl}/status/update/${id}`,status);
  }
  deleteStatus(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/status/${id}`);
  }


  //warehouse
  findAllWarehouse():Observable<Warehouse[]>{
    return this.http.get<Warehouse[]>(`${this.baseUrl}/warehouse/`);
  }
  findWarehouseById(id:number):Observable<Warehouse>{
    return this.http.get<Warehouse>(`${this.baseUrl}/warehouse/${id}`);
  }
  createWarehouse(warehouse:Warehouse):Observable<Warehouse>{
    return this.http.post<Warehouse>(`${this.baseUrl}/warehouse`,warehouse);
  }

  updateWarehoue(id:number,warehouse:Warehouse):Observable<Warehouse>{
    return this.http.patch<Warehouse>(`${this.baseUrl}/warehouse/update/${id}`,warehouse);
  }
  deleteWarehouse(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/warehouse/${id}`);
  }

  //categories
  findAllCategory():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}/categories/`);
  }
  findCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }
  createCategory(cate:Category):Observable<Category>{
    return this.http.post<Category>(`${this.baseUrl}/categories`,cate);
  }

  updateCategory(id:number,cate:Category):Observable<Category>{
    return this.http.patch<Category>(`${this.baseUrl}/categories/update/${id}`,cate);
  }
  deleteCategory(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }

  //products
  findAllProduct():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/products/`);
  }
  findProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  findProductByKeyword(keyoword:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/products/search?value=${keyoword}`);
  }
  createProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/products`,product);
  }

  updateProduct(id:number,product:Product):Observable<Product>{
    return this.http.patch<Product>(`${this.baseUrl}/products/update/${id}`,product);
  }
  deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }


  //Customer
  findAllCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseUrl}/customers/`);
  }
  findCustomerById(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`);
  }

  findCustomerByKeyword(keyoword:string):Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseUrl}/customers/search?value=${keyoword}`);
  }
  createCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${this.baseUrl}/customers`,customer);
  }

  updateCustomer(id:number,customer:Customer):Observable<Customer>{
    return this.http.patch<Customer>(`${this.baseUrl}/customers/update/${id}`,customer);
  }
  deleteCustomer(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/customers/${id}`);
  }

  //vendor
  findAllVendor():Observable<Vendor[]>{
    return this.http.get<Vendor[]>(`${this.baseUrl}/vendors/`);
  }
  findVendorById(id:number):Observable<Vendor>{
    return this.http.get<Vendor>(`${this.baseUrl}/vendors/${id}`);
  }

  findVendorByKeyword(keyoword:string):Observable<Vendor[]>{
    return this.http.get<Vendor[]>(`${this.baseUrl}/vendors/search?value=${keyoword}`);
  }
  createVendor(data:Vendor):Observable<Vendor>{
    return this.http.post<Vendor>(`${this.baseUrl}/vendors`,data);
  }

  updateVendor(id:number,data:Vendor):Observable<Vendor>{
    return this.http.patch<Vendor>(`${this.baseUrl}/vendors/update/${id}`,data);
  }
  deleteVendor(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/vendors/${id}`);
  }


  //-----------------stock
  findAllStock():Observable<Stock[]>{
    return this.http.get<Stock[]>(`${this.baseUrl}/stocks/`);
  }
  findStockById(id:number):Observable<Stock>{
    return this.http.get<Stock>(`${this.baseUrl}/stocks/${id}`);
  }

  findStockByKeyword(keyoword:string):Observable<Stock[]>{
    return this.http.get<Stock[]>(`${this.baseUrl}/stocks/search?value=${keyoword}`);
  }
  createStock(data:Stock):Observable<Stock>{
    return this.http.post<Stock>(`${this.baseUrl}/stocks`,data);
  }

  updateStock(id:number,data:Stock):Observable<Stock>{
    return this.http.patch<Stock>(`${this.baseUrl}/stocks/update/${id}`,data);
  }
  deleteStock(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/stocks/${id}`);
  }
  //----------------- demo ------------
  //book
  getAllBook():Observable<Book[]>{
    return this.http.get<Book[]>(`http://localhost:3001/book/`);
  }
  getBookById(id:number):Observable<Book>{
    return this.http.get<Book>(`${this.baseUrl}/book/${id}`);
  }
  createBook(book:Book):Observable<Book>{
    return this.http.post<Book>(`${this.baseUrl}/book`,book);
  }

  updateBook(id:number,book:Book):Observable<Book>{
    return this.http.patch<Book>(`${this.baseUrl}/book/update/${id}`,book);
  }
  deleteBook(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/book/${id}`);
  }
  //----------------- demo ------------
}
