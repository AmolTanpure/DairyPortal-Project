import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit
{
  loginForm!: FormGroup;
  hidePassword:boolean=true;
  AlluserData:any;
  userData:any;

  constructor(private service:MyserviceService,private formBuilder:FormBuilder,private _router:Router)
  {
    this.loginForm=this.formBuilder.group(
      {
        MobileNo:['',Validators.required],
        Password:['',Validators.required]
      }
    )
  }

  ngOnInit(): void 
  {
    this.service.getUserDetails().subscribe((data:any)=>
    {
      console.log(data);
      this.AlluserData=data;
    });
  }

  togglePasswordVisibility():void
  {
    this.hidePassword=!this.hidePassword;
  }

  onSubmit()
  {
      let userData=0;
      if(this.loginForm.valid)
      {
          const loginData=this.loginForm.value;

        this.service.postLoginDetails(loginData).subscribe((response:any)=>
        {
          if(response.message=="Login successful")
          {
            this.service.getUserDetailsbyMobileNo(loginData).subscribe((data:any)=>
            {
              userData=data;
              console.log(data);
            });
            console.log("Login Successful")
            alert('Login Successful');
            
            this._router.navigate(['/details'],{ queryParams: { MobileNo: loginData.MobileNo} })
          }
        
        },
          (    error: { status: number; }) => {
          // Handle the error
          if (error.status === 401) {
            // Handle 401 Unauthorized error (e.g., display an error message to the user)
            console.log('Unauthorized request. Please check your credentials.');
            alert('Unauthorized request. Please check your credentials.')
          } else {
            // Handle other errors
            console.error('Error during login:', error);
            alert('Error during login:')
          } 
          
        })
      }
      else
      {
          alert('Please enter MobileNo/Password')
      }
    
  }
}
