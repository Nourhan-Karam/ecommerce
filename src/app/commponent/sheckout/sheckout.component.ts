import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-sheckout',
  templateUrl: './sheckout.component.html',
  styleUrls: ['./sheckout.component.css']
})
export class SheckoutComponent implements OnInit{

  textMessage:string=''
  cartId:any=''
  constructor(private _FormBuilder:FormBuilder ,private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService){}
  checkout:FormGroup=this._FormBuilder.group({
    details:['' ,[Validators.required , Validators.minLength(3)]],
    phone:['',[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:['',[Validators.required ,Validators.minLength(3)]]
  })

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
       this.cartId= params.get('id')
       console.log(this.cartId)
        }
      })
  }

  hendlform(){
    if(this.checkout.valid == true){
      console.log(this.checkout.value)
      this._CartService.checkout(this.cartId ,this.checkout.value).subscribe({
        next:(response)=>{
          if(response.status="success"){
            window.open(response.session.url ,'_self')
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
    else{
      this.checkout.markAllAsTouched()
    }
   
  }
}
