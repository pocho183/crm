import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin.routing.module';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AdminComponent } from './admin.component';
import { AdministrationComponent } from './administration/administration.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { AccountsComponent } from './administration/accounts/accounts.component';
import { CompanyComponent } from './administration/company/company.component';

@NgModule({
  declarations: [
	AdminComponent,
	AdministrationComponent,
	DocumentationComponent,
	AccountsComponent,
	CompanyComponent
  ],
  imports: [
	HttpClientModule,
	BrowserModule,
	BrowserAnimationsModule,
	RouterModule,
	ToolbarModule,
	TableModule,
	AdminRoutingModule,
	ButtonModule,
	TabMenuModule,
	FormsModule,
	DropdownModule,
	PasswordModule,
	ConfirmPopupModule,
	ToastModule
  ],
  providers: [
	ConfirmationService,
	MessageService
  ],
  exports: [
	AdminComponent
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {}