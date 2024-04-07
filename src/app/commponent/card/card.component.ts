import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  constructor(private _CartService:CartService){}
  cartDetails:any ={}
  allDetails:any={}

  removeCardItem(id:string):void{
    this._CartService.removItem(id).subscribe({
      next:(response)=>{
        // console.log(response)
        this.cartDetails=response.data;
        this.allDetails=response
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  changCount(id:string , count:number){
    if(count>0){
      this._CartService.updateCardItem(id ,count).subscribe({
        next:(response)=>{
          // console.log(response)
          this.cartDetails=response.data;
          this.allDetails=response
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
   
  }

  ngOnInit(): void {
      this._CartService.getUserCard().subscribe({
        next:(response)=>{
          // console.log(response.data)
          this.allDetails=response
          this.cartDetails=response.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }
}
