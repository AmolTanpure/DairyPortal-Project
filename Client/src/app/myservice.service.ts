import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { Observable } from 'rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService 
{

  constructor(private http:HttpClient) 
  { }

  postUserDetails(data:any):Observable<any>
  {
    
    return this.http.post<any>("http://localhost:5100/userDetails",data).pipe(
      catchError((error: HttpErrorResponse) => 
      {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          console.log('Unauthorized request. Please check your credentials.');
        } else if (error.status === 402) 
        {
          // Handle 401 Unauthorized error
          console.log('Unauthorized request.  MobileNo and UserID already exist.');
        } 
        else
        {
          // Handle other errors
          console.error('An error occurred:', error.error.message || error.statusText);
        }

        // Pass the error to the caller of the service
        return throwError(error);
      }));
  }




  getUserDetails():Observable<any>
  {
    return this.http.get<any>("http://localhost:5100/userDetails/allUserDetails")
  }

  getUserDetailsbyMobileNo(data:any):Observable<any>
  {
    const params = new HttpParams().set('MobileNo', data.MobileNo)
    
    return this.http.get<any>("http://localhost:5100/userDetails/byMobileNo",{params})
  }

  getMilkDetailsbyMobileNo(data:any):Observable<any[]>
  {
    const params = new HttpParams().set('MobileNo', data.MobileNo)
    
    return this.http.get<any[]>("http://localhost:5100/milkDetails/byMobileNo",{params})
  }
  postLoginDetails(data:any):Observable<any>
  {
    console.log(data);
    return this.http.post<any>("http://localhost:5100/LoginDetails",data).pipe(
      catchError((error: HttpErrorResponse) => 
      {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          console.log('Unauthorized request. Please check your credentials.');
        } else {
          // Handle other errors
          console.error('An error occurred:', error.error.message || error.statusText);
        }

        // Pass the error to the caller of the service
        return throwError(error);
      }));
  

  }

  //milkdetails

  postMilkDetails(data:any):Observable<any>
  {
    return this.http.post<any>("http://localhost:5100/MilkDetails",data)
  }
  
}
