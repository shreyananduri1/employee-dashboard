import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpListComponent } from './pages/emp-list/emp-list.component';

const routes: Routes = [
  {path: 'emp-list', component:EmpListComponent},
  
  {path: '', redirectTo: '/emp-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
