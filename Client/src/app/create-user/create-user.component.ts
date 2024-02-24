import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit
{
  MyForm:any;
  

  constructor(private service:MyserviceService,private formBuilder:FormBuilder,private _router:Router)
  {

  }

  ngOnInit()
  {
    this.MyForm=this.formBuilder.group(
      {
        MobileNo:['',[Validators.required]],
        Name:['',[Validators.required]],
        UserID:['',[Validators.required]],
        Password: ['',[Validators.required]],
        ConfirmPassword:['',[Validators.required]]
      }
    )
  }

  onClickSubmit()
  {
    if(this.MyForm.get('Password').value==this.MyForm.get('ConfirmPassword').value)
    {
      if(this.MyForm.valid)
      {
        const data=this.MyForm.value;
        this.service.postUserDetails(data).subscribe((response: any)=>
        {
          console.log("Data send to service with response: ",response)
          alert('New user created successfully')
          this._router.navigate(['/LoginPage'])
          
        },
        (error: { status: number; }) => 
        {
          // Handle the error
          if (error.status === 401) {
            
            console.log('User already exist');
            alert('User already exist')
          } else
          if (error.status === 402) 
          {
            
            console.log('Unauthorized request.  MobileNo and UserID already exist');
            alert('MobileNo and UserID already exist')
          }
          else
          {
            // Handle other errors
            console.error('Error during creating user', error);
            alert('Error during creating user')
          } 

        })
        
        
      }
      else
      {
        alert('Please fill all the details')
      }
    }
    else
    {
      alert('Please password is mismateched in both the fields')
    }
  }
}
