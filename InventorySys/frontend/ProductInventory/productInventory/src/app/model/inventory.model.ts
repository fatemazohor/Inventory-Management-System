
//Category class
export class Categories{
    id:number = 0
    cate_name?:string;
}
//book class
export class Book{
    id:number =0
    name?: string
    price?: number
    dept_id?:number;
}
//book class
// ----------------------------------------- INVENTORY ----------------------------------------

//warehouses 
export class Warehouse{
    id: number=0
    wname?: string
}

//categories 
export class Category{
    id: number=0
    cname?: string
}
//products 
export class Product{
    id: number=0
    pname?: string
    pcode?: string
    pcate?: number
    price?: number
    createdate?:Date
}