import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './template/main-header/main-header.component';
import { MainSidebarComponent } from './template/main-sidebar/main-sidebar.component';
import { MainWrapperComponent } from './template/main-wrapper/main-wrapper.component';
import { MainControlSidebarComponent } from './template/main-control-sidebar/main-control-sidebar.component';
import { MainFooterComponent } from './template/main-footer/main-footer.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { BookComponent } from './components/book/book.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MainWrapperComponent,
    MainControlSidebarComponent,
    MainFooterComponent,
    AppLayoutComponent,
    LoginLayoutComponent,
    BookComponent,
    LoginFormComponent,
    RegisterComponent,
    ProductsComponent,
    CategoriesComponent,
    WarehousesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
