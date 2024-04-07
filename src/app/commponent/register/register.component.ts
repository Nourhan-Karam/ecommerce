import { Component } from '@angular/core';
import { FormGroup, FormControl ,Validators, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 registerForm:FormGroup =new FormGroup({
  name: new FormControl('' ,[Validators.required ,Validators.minLength(3) ,Validators.maxLength(10)]),
  email :new FormControl('' , [Validators.required ,Validators.email]),
  password :new FormControl('', [ Validators.required, Validators.pattern(/^\w{6,}$/)]),
  rePassword:new FormControl('' ),
  phone:new FormControl('',[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)])
 } , {validators:[this.confiremPassword]} as FormControlOptions)

 confiremPassword(group:FormGroup):void{
  const password =group.get('password');
  const rePassword=group.get('rePassword')

  if(rePassword?.value == ''){
    rePassword.setErrors({required:true})
  }
  else if(password?.value != rePassword?.value){
    rePassword?.setErrors({mismatch:true})
  }
 }


 errorMasage:string=''
 isSpanner:boolean=false
constructor(private _AuthService:AuthService ,private _Router:Router){}

 handlForm():void{
 const userdata=this.registerForm.value
 this.isSpanner=true
  if(this.registerForm.valid == true){
    // console.log(this.registerForm.value)
    this._AuthService.rigister(userdata).subscribe(
     {
      next:(response)=>{
        if(response.message =='success'){
          this._Router.navigate(['/login'])
          this.isSpanner=false
        }
        
      },
      error:(err)=>{
        this.errorMasage=err.error.message;
        this.isSpanner=false
      }
     } 
    )

  }
 }
}
