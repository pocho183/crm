import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './security';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AdminAdministrationComponent } from './components/admin/administration/administration.component';
import { AdminDocumentationComponent } from './components/admin/documentation/documentation.component';
import { TaskComponent } from './components/manager/task/task.component';
import { ManagerAdministrationComponent } from './components/manager/administration/administration.component';
import { ManagerDocumentationComponent } from './components/manager/documentation/documentation.component';

const routes: Routes = [
	/* Settings */
	{ path: '', component: DashboardComponent, canActivate: [AuthGuard] },
	
	/* ADMIN  */
	{ path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'admin/administration', component: AdminAdministrationComponent, canActivate: [AuthGuard] },
	{ path: 'admin/documentation', component: AdminDocumentationComponent, canActivate: [AuthGuard] },
	
	/* MANAGER  */
	{ path: 'manager', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'manager/administration', component: ManagerAdministrationComponent, canActivate: [AuthGuard] },
	{ path: 'manager/task', component: TaskComponent, canActivate: [AuthGuard] },
	{ path: 'manager/documentation', component: ManagerDocumentationComponent, canActivate: [AuthGuard] },
	
	/* Page not found */
	{ path: '**', component: PageNotFoundComponent }
	
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}