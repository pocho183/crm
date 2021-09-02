import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { ManagerComponent } from './manager.component';
import { ManagerAdministrationComponent } from './administration/administration.component';
import { TaskComponent } from './task/task.component';
import { ManagerDocumentationComponent } from './documentation/documentation.component';
import { AccountsComponent } from './administration/accounts/accounts.component';

@NgModule({
  declarations: [
	ManagerComponent,
	ManagerAdministrationComponent,
	TaskComponent,
	ManagerDocumentationComponent,
	AccountsComponent
  ],
  imports: [
	BrowserModule,
	RouterModule,
	ToolbarModule,
	ButtonModule,
	TooltipModule,
	TableModule,
	TabMenuModule,
	PasswordModule,
	FormsModule,
	DropdownModule,
	ToastModule,
	ConfirmPopupModule
  ],
  providers: [
	
  ],
  exports: [
	ManagerComponent
  ]
})
export class ManagerModule {}