import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit
{
   DetailsForm!: FormGroup;
   userMobileNo:any;
   

   constructor(private service:MyserviceService,private formBuilder:FormBuilder,private _router:Router,private route:ActivatedRoute)
  {
      this.DetailsForm=this.formBuilder.group(
        {
          MobileNo:[{value:''}],
          Name:[{value:''}],
          UserID:[{value:''}],
          Qty:[0],
          Fat:[''],
          SNF:[''],
          Rate:[0],
          Amount:[0]
        }

      )
  }

  ngOnInit()
  {
    //
    this.route.queryParams.subscribe((queryParams: any ) => 
    {
      // Access the passed data from the route parameters
      this.userMobileNo = queryParams['MobileNo'];
      console.log('Received details array:', this.userMobileNo);
      
      this.service.getUserDetailsbyMobileNo({'MobileNo':this.userMobileNo}).subscribe((response:any)=>
      {
        console.log("response from getuserdetailsbyMobileNo:",response);
        this.DetailsForm.patchValue(
          {
          MobileNo: response.MobileNo,
          Name: response.Name,
          UserID: response.UserID
          });
        
      })
     
    })
      // Subscribe to changes in Qty and Rate controls
    this.DetailsForm.get('Qty')!.valueChanges.subscribe(() => {
      this.updateAmount();
    }),

    this.DetailsForm.get('Rate')!.valueChanges.subscribe(() => {
      this.updateAmount();
    })
    
  }


  OnSubmit()
  {
      let milkData=this.DetailsForm.value;
      
      this.service.postMilkDetails(milkData).subscribe((response:any)=>
      {
        console.log("Data posted on server successfully",response);
        alert("Milk Details added successfully!")
      })
      
  }

  updateAmount() 
  {
    const qty = this.DetailsForm.get('Qty')!.value;
    const rate = this.DetailsForm.get('Rate')!.value;

    // Perform the multiplication to calculate the Amount
    const amount = qty * rate;

    // Update the value of the Amount control
    this.DetailsForm.get('Amount')!.setValue(amount);
  }

  getMilkDetails()
  {
    
    this._router.navigate(['/milkDetails'],{queryParams: {MobileNo: this.userMobileNo}})
    
  }
}
