import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) { }

 

  addToCard(productId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{
      "productId": productId
    }
    )
  }

  getUserCard():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` 
    )
  }

  removItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    )
  }

  updateCardItem(idProduct:string,newCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${idProduct}`,{
      count: newCount
    }
    )
  }

  checkout(cardId:string , userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:4200`,
    {
      
    shippingAddress:userData
     
    }
    )
  }

}
