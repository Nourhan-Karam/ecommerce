import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { EcomdataService } from 'src/app/services/ecomdata.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  catagories:any[]=[]
  searchTerm:string=''
  wishlistData:string[]=[]
  products:any[]=[]

  constructor(private _EcomdataService:EcomdataService ,private _CartService:CartService ,private _ToastrService:ToastrService ,private _WishlistService:WishlistService){}
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
