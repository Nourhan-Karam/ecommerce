import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent implements OnInit {
  constructor(private _AuthService:AuthService , private _CartService:CartService){}

  cartCount:number=0

  ngOnInit(): void {
     this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartCount=data
      }
     })
     this._CartService.getUserCard().subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
     })
  }


  loginOutUser():void{
    this._AuthService.logOut()
  }
}
