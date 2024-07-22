import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SteComponent } from './pages/ste/ste.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path:'ste/:id',component:SteComponent},
  { path:'ste/:id/page/:pageName',component:SteComponent},
  { path:'Login',component:LoginComponent},
  { path:'Register',component:RegisterComponent},
  { path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
