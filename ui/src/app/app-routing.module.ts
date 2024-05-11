import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminAdministrationComponent } from './components/admin/administration/administration.component';
import { AdminDocumentationComponent } from './components/admin/documentation/documentation.component';

import { AuthGuard } from './security';
import { AdminGuard } from './security';
import { ModeratoreGuard } from './security';
import { ReferenteAziendaGuard } from './security';
import { ReferenteClienteGuard } from './security';
import { ReaderAziendaGuard } from './security';
import { ReaderClienteGuard } from './security';

import { ModeratoreAdministrationComponent } from './components/moderatore/administration/administration.component';
import { ModeratoreRegisterComponent } from './components/moderatore/register/register.component';
import { ResponsibilityComponent } from './components/moderatore/responsibility/responsibility.component';
import { TaskComponent } from './components/moderatore/task/task.component';

import { ReferenteAziendaComponent } from './components/referenteazienda/referenteazienda.component';
import { ReferenteAziendaAdministrationComponent } from './components/referenteazienda/administration/administration.component';
import { ReferenteAziendaRegisterComponent } from './components/referenteazienda/register/register.component';
import { ReferenteAziendaResponsibilityComponent } from './components/referenteazienda/responsibility/responsibility.component';

import { ReferenteClienteComponent } from './components/referentecliente/referentecliente.component';
import { ReaderAziendaComponent } from './components/readerazienda/readerazienda.component';
import { ReaderClienteComponent } from './components/readercliente/readercliente.component';

import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
	
	/* Settings */
	{ path: '', component: DashboardComponent, canActivate: [AuthGuard] },
	
	/* ADMIN  */
	{ path: 'admin', component: DashboardComponent, canActivate: [AdminGuard] },
	{ path: 'admin/administration', component: AdminAdministrationComponent, canActivate: [AdminGuard] },
	{ path: 'admin/documentation', component: AdminDocumentationComponent, canActivate: [AdminGuard] },

	/* MODERATORE  */
	{ path: 'moderatore', component: DashboardComponent, canActivate: [ModeratoreGuard] },
	{ path: 'moderatore/administration', component: ModeratoreAdministrationComponent, canActivate: [ModeratoreGuard] },
	{ path: 'moderatore/register', component: ModeratoreRegisterComponent, canActivate: [ModeratoreGuard] },
	{ path: 'moderatore/responsibility', component: ResponsibilityComponent, canActivate: [ModeratoreGuard] },
	{ path: 'moderatore/task', component: TaskComponent, canActivate: [ModeratoreGuard] },	
	
	/* REFERENTE AZIENDA  */
	{ path: 'referenteazienda', component: ReferenteAziendaComponent, canActivate: [ReferenteAziendaGuard] },
	{ path: 'referenteazienda/administration', component: ReferenteAziendaAdministrationComponent, canActivate: [ReferenteAziendaGuard] },
	{ path: 'referenteazienda/register', component: ReferenteAziendaRegisterComponent, canActivate: [ReferenteAziendaGuard] },
	{ path: 'referenteazienda/responsibility', component: ReferenteAziendaResponsibilityComponent, canActivate: [ReferenteAziendaGuard] },
	
	/* REFERENTE CLIENTE  */
	{ path: 'referentecliente', component: ReferenteClienteComponent, canActivate: [ReferenteClienteGuard] },
	
	/* READER AZIENDA  */
	{ path: 'readerazienda', component: ReaderAziendaComponent, canActivate: [ReaderAziendaGuard] },
	
	/* READER CLIENTE  */
	{ path: 'readercliente', component: ReaderClienteComponent, canActivate: [ReaderClienteGuard] },
	
	/* Page not found */
	// { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}