import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../app.component';
import { TaskComponent } from './task/task.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
	
	{ path: 'manager/task', component: TaskComponent },
	{ path: 'manager/documentation', component: DocumentationComponent },
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
export class ManagerRoutingModule {}