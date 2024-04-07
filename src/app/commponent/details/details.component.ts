import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { product } from 'src/app/interfaces/product';
import { EcomdataService } from 'src/app/services/ecomdata.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  productDetails:product={} as product
  cartDetails:any ={}
  wishlistData:string[]=[]
constructor(private _ActivatedRoute:ActivatedRoute ,
   private _EcomdataService:EcomdataService ,
   private _WishlistService:WishlistService
   ,
   private _CartService:CartService ,private _ToastrService:ToastrService){}
   
productSlider: OwlOptions = {
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
  
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          let idProduct:any=params.get('id')
          // console.log(idProduct)
          this._EcomdataService.getProductDetails(idProduct).subscribe({
            next:(response)=>{
             this.productDetails=response.data;
             console.log(this.productDetails )
            }
          })
        }

      })
     
    this._WishlistService.addFav().subscribe({
      next:(response)=>{
        const newData=response.data.map((item:any)=>item._id)
        // console.log(newData )
        this.wishlistData=newData
      },
      error:(err)=>{
        console.log(err)
      }
    })

   

  }

  removeWishlist(id:string):void{
    this._WishlistService.wishlistDelete(id).subscribe({
      next:(response)=>{
        // console.log(response)
        this.wishlistData=response.data
        this._ToastrService.warning(response.message)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  cartAdd(id:string):void{
    this._CartService.addToCard(id).subscribe({
      next:(response)=>{
       
        this._ToastrService.success(response.message)
      }
    })
  }

  wishlistCart(id:string):void{
    this._WishlistService.addToWishlist(id).subscribe({
      next:(response)=>{
        // console.log(response)
        this.wishlistData=response.data
        this._ToastrService.success(response.message)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
