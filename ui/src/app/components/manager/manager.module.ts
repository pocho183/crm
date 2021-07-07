import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ManagerRoutingModule } from './manager.routing.module';

import { ManagerComponent } from './manager.component';
import { TaskComponent } from './task/task.component';
import { DocumentationComponent } from './documentation/documentation.component';

@NgModule({
  declarations: [
	ManagerComponent,
	TaskComponent,
	DocumentationComponent
  ],
  imports: [
	BrowserModule,
	RouterModule,
	ToolbarModule,
	ManagerRoutingModule,
	ButtonModule
  ],
  providers: [
	
  ],
  exports: [
	ManagerComponent
  ],
  bootstrap: [ManagerComponent]
})
export class ManagerModule {}