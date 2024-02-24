import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-milk-details',
  templateUrl: './milk-details.component.html',
  styleUrls: ['./milk-details.component.css']
})
export class MilkDetailsComponent implements OnInit
{
  userMobileNo:any;
  milkdetails: any[] = [];

    constructor(private _router:Router,private service:MyserviceService,private route:ActivatedRoute)
    {

    }


    ngOnInit()
    {
      this.route.queryParams.subscribe((queryParams:any)=>
        {
          this.userMobileNo=queryParams['MobileNo'];
        }
      )
        console.log("user mobile No: ",this.userMobileNo)
      this.service.getMilkDetailsbyMobileNo({'MobileNo':this.userMobileNo}).subscribe((response:any[])=>
      {
        this.milkdetails=response;
        console.log("response from server about milkdetails is: ");
        for(let i:number=0;i<this.milkdetails.length;i++)
        {
          console.log(i, " th number element of response is : ",this.milkdetails[i]);
        }
        
      })
    }
}
