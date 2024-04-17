import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { BookComponent } from './components/book/book.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './components/register/register.component';
import { MainWrapperComponent } from './template/main-wrapper/main-wrapper.component';

const routes: Routes = [
  {path:'inventory',component:AppLayoutComponent,
    children:[

      // add other routes
      {path:"book",component:BookComponent},
      {path:"dashboard",component:MainWrapperComponent},
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
