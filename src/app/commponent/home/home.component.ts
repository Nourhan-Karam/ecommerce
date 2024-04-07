import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/interfaces/product';
import { EcomdataService } from 'src/app/services/ecomdata.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService ,private _CartService:CartService ,private _ToastrService:ToastrService ,private _WishlistService:WishlistService){}

  catagories:any[]=[]
  searchTerm:string=''
  wishlistData:string[]=[]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: true
  }
  wishlistCart(id:string):void{
    this._WishlistService.addToWishlist(id).subscribe({
      next:(response)=>{
        this.wishlistData=response.data
        console.log(this.wishlistData)
        this._ToastrService.success(response.message)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  cartAdd(id:string):void{
    this._CartService.addToCard(id).subscribe({
      next:(response)=>{
        // console.log(response)
        this._ToastrService.success(response.message)
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  removeWishlist(id:string):void{
    this._WishlistService.wishlistDelete(id).subscribe({
      next:(response)=>{
        console.log(response)
        this.wishlistData=response.data
        this._ToastrService.warning(response.message)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  products:product[]=[]
  ngOnInit(): void {
      this._EcomdataService.getAllProducts().subscribe({
        next:(response)=>{
         // console.log(response)
          this.products=response.data
        }
      })

      this._EcomdataService.getCategrios().subscribe({
        next:(respons)=>{
          // console.log(response.data)
          this.catagories=respons.data
        }
      })

      this._WishlistService.addFav().subscribe({
        next:(response)=>{
          // console.log(response.data)
          const newData= response.data.map((item:any)=>item._id)
          // console.log(newData)
          this.wishlistData=newData
        },
        error:(err)=>{
          console.log(err)
        }
      })


  }

}
