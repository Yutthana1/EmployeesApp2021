import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesListComponent} from "./employees-list/employees-list.component";
import {EmployeesCreateComponent} from "./employees-create/employees-create.component";

const routes: Routes = [
  { path: '', component: EmployeesListComponent },
  { path: 'createEmp/:Show', component: EmployeesCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
