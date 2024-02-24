import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DetailsComponent } from './details/details.component';
import { MilkDetailsComponent } from './milk-details/milk-details.component';

const routes: Routes = 
[
  {
    path:'',redirectTo:'HomePage',pathMatch:'full'
  },
  {
    path:'HomePage',component:HomePageComponent
  },
  {
    path:'CreateUser',component:CreateUserComponent
  },
  {
    path:'LoginPage',component:LoginPageComponent
  },
  {
    path:'details',component:DetailsComponent
  },
  {
    path:'milkDetails',component:MilkDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
