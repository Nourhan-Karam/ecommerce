import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './commponent/home/home.component';
import { CardComponent } from './commponent/card/card.component';
import { CategoriesComponent } from './commponent/categories/categories.component';
import { LoginComponent } from './commponent/login/login.component';
import { RegisterComponent } from './commponent/register/register.component';
import { PrandsComponent } from './commponent/prands/prands.component';
import { NotFoundComponent } from './commponent/not-found/not-found.component';
import { ProductsComponent } from './commponent/products/products.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './guards/auth.guard';
import { DetailsComponent } from './commponent/details/details.component';
import { SheckoutComponent } from './commponent/sheckout/sheckout.component';
import { WishlistComponent } from './commponent/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './commponent/forgetpassword/forgetpassword.component';

const routes: Routes = [


  {path:"",canActivate:[authGuard],
  component:BlankLayoutComponent,children:[
    {path:"",redirectTo:'home',pathMatch:'full'},
    {path:"home", component:HomeComponent ,title:'Home'},
    {path:"card", component:CardComponent , title:'Card'},
    {path:"categories",component:CategoriesComponent , title:'Categories'},
    {path:"wishlist",component:WishlistComponent ,title:'Wishlist'},
    {path:'details/:id',component:DetailsComponent , title:'Details'},
    {path:'sheckout/:id',component:SheckoutComponent , title:'checkout'},
    {path:"prands",component:PrandsComponent , title:'prands'},
    {path:"products",component:ProductsComponent,title:"Products"},
  ]},
 {path:"", component:AuthLayoutComponent,children:[
  {path:"login",component:LoginComponent , title:'Login'},
  {path:"register",component:RegisterComponent , title:'Register'},
  {path:"forgetpassword",component:ForgetpasswordComponent , title:'forgetPssword'},
 ]},
  
 
  {path:"**",component:NotFoundComponent ,title:'notfound'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
