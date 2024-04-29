import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountService } from '../../services/account.service';
import { CompanyService } from '../../services/company.service';

import { AdminComponent } from './admin.component';
import { AdminAdministrationComponent } from './administration/administration.component';
import { AdminDocumentationComponent } from './documentation/documentation.component';
import { AccountsComponent } from './administration/accounts/accounts.component';
import { CompanyComponent } from './administration/company/company.component';

@NgModule({
  declarations: [
	AdminComponent,
	AdminAdministrationComponent,
	AdminDocumentationComponent,
	AccountsComponent,
	CompanyComponent
  ],
  imports: [
	HttpClientModule,
	BrowserModule,
	BrowserAnimationsModule,
	RouterModule,
	TableModule,
	ToolbarModule,
	TooltipModule,
	ButtonModule,
	TabMenuModule,
	FormsModule,
	DropdownModule,
	PasswordModule,
	ConfirmPopupModule,
	ToastModule
  ],
  providers: [
	CompanyService,
	AccountService,
	ConfirmationService,
	MessageService
  ],
  exports: [ AdminComponent ]
})
export class AdminModule {}