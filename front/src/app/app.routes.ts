import { Routes } from '@angular/router';
import { LoginComponent } from './Componends/login/login.component';
import { signupComponent } from './Componends/signup/signup.component';
import { FedbackComponent } from './Componends/fedback/fedback.component';



export const routes: Routes = [
  {title: "Login", path:'login' , component: LoginComponent},

  {title: "signup", path:'signup' , component : signupComponent },

  {title: "signup", path:'' , component : signupComponent },

  {title: "Feedback", path:'feedback' , component : FedbackComponent },
  


  //{title: "RECRUITS | Login", path:'login' , component: LoginComponent},
];

