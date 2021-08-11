import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { ManagerComponent } from './manager.component';
import { TaskComponent } from './task/task.component';
import { ManagerDocumentationComponent } from './documentation/documentation.component';

@NgModule({
  declarations: [
	ManagerComponent,
	TaskComponent,
	ManagerDocumentationComponent
  ],
  imports: [
	BrowserModule,
	RouterModule,
	ToolbarModule,
	ButtonModule
  ],
  providers: [
	
  ],
  exports: [
	ManagerComponent
  ]
})
export class ManagerModule {}