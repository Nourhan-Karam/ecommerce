import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService:WishlistService ,private _CartService:CartService ,private _ToastrService:ToastrService){}
  wishData:any={}
  allDetails:any={}

  ngOnInit(): void {
      this._WishlistService.addFav().subscribe({
        next:(response)=>{
          // console.log(response.data)
          this.wishData=response.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  removItem(id:string):void{
    this._WishlistService.wishlistDelete(id).subscribe({
      next:(response)=>{
        console.log(response.data)
        this._ToastrService.warning(response.message)
        this.wishData=response.data

        this._WishlistService.addFav().subscribe({
          next:(response)=>{
            this.wishData=response.data
          }
        })

        // const newData =this.wishData.filter((item:any)=>this.wishData.includes(item._id))
        // this.wishData =newData
      },
      error:(err)=>{
        console.log(err)
      }

    })
   
  }

  addCart(caeId:string){
    this._CartService.addToCard(caeId).subscribe({
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
  
 
  
}
