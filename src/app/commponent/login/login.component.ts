import { Component } from '@angular/core';
import { FormBuilder, FormControl ,FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // loginForm:FormGroup=new FormGroup({
  //   email:new FormControl('',[Validators.required ,Validators.email]),
  //   password :new FormControl('',[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  // })
  loginForm:FormGroup = this._FormBuilder.group({
    email:['',[Validators.required ,Validators.email]],
    password:['',[Validators.required,Validators.pattern(/^\w{6,}$/)]]

  })
  errorMasage:string='';
  isSpanner:boolean=false
  constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder:FormBuilder){}
   
  handlform():void{
    // console.log("hello")
    const userData=this.loginForm.value;
    this.isSpanner=true
    if(this.loginForm.valid == true){
 this._AuthService.login(userData).subscribe({
  next:(response)=>{
    if(response.message =='success'){
      localStorage.setItem('eToken',response.token)
      // console.log(response)
      this._Router.navigate(['/home'])
      this.isSpanner=false

    }
  },
  error:(err)=>{
    this.errorMasage=err.error.message
    this.isSpanner=false

  }
})
  }
  else{
    this.loginForm.markAllAsTouched()
  }
}
}
