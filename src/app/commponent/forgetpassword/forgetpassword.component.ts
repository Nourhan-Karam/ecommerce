import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  constructor(private _PasswordService:PasswordService ,private _Router:Router){}
  messaUser:string=''
  email:string=''
  step1:boolean=true
  step2:boolean=false
  step3:boolean=false

  forgetform:FormGroup=new FormGroup({
    email:new FormControl('', [Validators.required ,Validators.email]),
  })

  codeform:FormGroup=new FormGroup({
    resetCode:new FormControl('')
  })

  
  newpassword:FormGroup=new FormGroup({
    newPassword:new FormControl('',[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })


  forgetPssword():void{
    let userEmail=this.forgetform.value
    this.email=userEmail.email
    this._PasswordService.forgetPassword(userEmail).subscribe({
      next:(response)=>{
       
        // console.log(response)
        this.messaUser=response.message
        this.step1=false
        this.step2=true
      },
      error:(err)=>{
        this.messaUser=err.error.message
      }
    })
  }
  resetCode():void{
    let restCod=this.codeform.value
    this._PasswordService.resetCodeuser( restCod).subscribe({
      next:(response)=>{
        // console.log(response)
        this.messaUser=response.message
        this.step2=false
        this.step3=true
      },
      error:(err)=>{
        console.log(err)
        this.messaUser=err.error.message
      }
    })
  }
  restpassword():void{
    let resetForm=this.newpassword.value
    resetForm.email=this.email
    this._PasswordService.resetPassword(resetForm).subscribe({
      next:(response)=>{
        // console.log(response)
        if(response.token){
          localStorage.setItem('eToken' ,response.token);

          this._Router.navigate(['/home'])
          
        }
      },
      error:(err)=>{
        // console.log(err)
        this.messaUser=err.error.message
      }
    })
  }
}
