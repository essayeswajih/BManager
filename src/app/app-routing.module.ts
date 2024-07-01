import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SteComponent } from './pages/ste/ste.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path:'ste/:id',component:SteComponent},
  { path:'ste/:id/page/id',component:SteComponent},
  { path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
