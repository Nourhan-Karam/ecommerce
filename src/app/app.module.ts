import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './commponent/home/home.component';
import { CardComponent } from './commponent/card/card.component';
import { PrandsComponent } from './commponent/prands/prands.component';
import { CategoriesComponent } from './commponent/categories/categories.component';
import { ProductsComponent } from './commponent/products/products.component';
import { LoginComponent } from './commponent/login/login.component';
import { RegisterComponent } from './commponent/register/register.component';
import { NavbarAuthComponent } from './commponent/navbar-auth/navbar-auth.component';
import { NavbarBlankComponent } from './commponent/navbar-blank/navbar-blank.component';

import { NotFoundComponent } from './commponent/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DetailsComponent } from './commponent/details/details.component';
import { RouterModule } from '@angular/router';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TermtextPipe } from './termtext.pipe';
import { SearchPipe } from './search.pipe';

import { ToastrModule } from 'ngx-toastr';
import { SheckoutComponent } from './commponent/sheckout/sheckout.component';
import { MyHttpInterceptor } from './interceptors/my-http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { WishlistComponent } from './commponent/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './commponent/forgetpassword/forgetpassword.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    PrandsComponent,
    CategoriesComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    NavbarAuthComponent,
    NavbarBlankComponent,
   
    NotFoundComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    DetailsComponent,
    TermtextPipe,
    SearchPipe,
    SheckoutComponent,
    WishlistComponent,
    ForgetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,

    
  ],
  providers: [{provide:HTTP_INTERCEPTORS ,useClass:MyHttpInterceptor ,multi:true},
    {provide:HTTP_INTERCEPTORS ,useClass:LoadingInterceptor ,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
