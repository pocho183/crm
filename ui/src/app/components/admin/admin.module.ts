import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin.routing.module';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';

import { AdminComponent } from './admin.component';
import { AdministrationComponent } from './administration/administration.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { AccountsComponent } from './administration/accounts/accounts.component';
import { ClientsComponent } from './administration/clients/clients.component';

@NgModule({
  declarations: [
	AdminComponent,
	AdministrationComponent,
	DocumentationComponent,
	AccountsComponent,
	ClientsComponent
  ],
  imports: [
	HttpClientModule,
	BrowserModule,
	RouterModule,
	ToolbarModule,
	TableModule,
	AdminRoutingModule,
	ButtonModule,
	TabMenuModule,
	FormsModule,
	DropdownModule,
	PasswordModule
  ],
  providers: [
  ],
  exports: [
	AdminComponent
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {}