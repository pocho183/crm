import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminAdministrationComponent } from './components/admin/administration/administration.component';
import { AdminDocumentationComponent } from './components/admin/documentation/documentation.component';

import { AuthGuard } from './security';

import { ManagerRegisterComponent } from './components/manager/register/register.component';
import { ResponsibilityComponent } from './components/manager/responsibility/responsibility.component';
import { TaskComponent } from './components/manager/task/task.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
	
	/* Settings */
	{ path: '', component: DashboardComponent, canActivate: [AuthGuard] },
	
	/* ADMIN  */
	{ path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'admin/administration', component: AdminAdministrationComponent, canActivate: [AuthGuard] },
	{ path: 'admin/documentation', component: AdminDocumentationComponent, canActivate: [AuthGuard] },

	/* MANAGER  */
	{ path: 'manager', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'manager/register', component: ManagerRegisterComponent, canActivate: [AuthGuard] },
	{ path: 'manager/responsibility', component: ResponsibilityComponent, canActivate: [AuthGuard] },
	{ path: 'manager/task', component: TaskComponent, canActivate: [AuthGuard] },
	
	/* Page not found */
	// { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}