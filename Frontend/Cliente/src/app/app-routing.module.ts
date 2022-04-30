import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ASTComponent } from './components/ast/ast.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'AST',
    component:ASTComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
