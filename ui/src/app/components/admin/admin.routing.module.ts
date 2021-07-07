import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AdministrationComponent } from './administration/administration.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
	
	{ path: 'admin/administration', component: AdministrationComponent },
	{ path: 'admin/documentation', component: DocumentationComponent },
	/*{ path: '**', component: PageNotFoundComponent }*/

];


@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AdminRoutingModule {}