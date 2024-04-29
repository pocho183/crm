import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const securityRoutes: Routes = [
  { path: 'logout', component: LoginComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(securityRoutes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
