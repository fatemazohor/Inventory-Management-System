import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book, Warehouse, Category, Product } from '../model/inventory.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001"

  constructor(private http:HttpClient) { }


  //---------------------------------------- INVENTORY ---------------------------------------

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
