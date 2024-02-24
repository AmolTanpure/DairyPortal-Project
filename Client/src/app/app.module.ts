import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MyserviceService } from './myservice.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { DetailsComponent } from './details/details.component';
import { MilkDetailsComponent } from './milk-details/milk-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateUserComponent,
    LoginPageComponent,
    DetailsComponent,
    MilkDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
