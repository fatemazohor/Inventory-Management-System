import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { BookComponent } from './components/book/book.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './components/register/register.component';
import { MainWrapperComponent } from './template/main-wrapper/main-wrapper.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { ProductsComponent } from './components/products/products.component';
import { StatusComponent } from './components/status/status.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { CustomersComponent } from './components/customers/customers.component';
import { StocksComponent } from './components/stocks/stocks.component';

const routes: Routes = [
  {path:'inventory',component:AppLayoutComponent,
    children:[

      // add other routes
      {path:"book",component:BookComponent},
      {path:"dashboard",component:MainWrapperComponent},
      {path:"category",component:CategoriesComponent},
      {path:"warehouse",component:WarehousesComponent},
      {path:"status",component:StatusComponent},
      {path:"vendor",component:VendorsComponent},
      {path:"customer",component:CustomersComponent},
      {path:"product",component:ProductsComponent},
      {path:"stock",component:StocksComponent},
    ]
  },
  {path:"login",
    component:LoginLayoutComponent,
    children:[
      {path:"",component:LoginFormComponent},
      {path:"register",component:RegisterComponent},
    ]
  },
   { path: "**", redirectTo: "/login", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
