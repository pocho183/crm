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
import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';
import { StepperModule } from 'primeng/stepper';

import { ReferenteAziendaComponent } from './referenteazienda.component';
import { ReferenteAziendaAdministrationComponent } from './administration/administration.component';
import { ReferenteAziendaAccountsComponent } from './administration/accounts/accounts.component';
import { ReferenteAziendaRegisterComponent } from './register/register.component';
import { ReferenteAziendaResponsibilityComponent } from './responsibility/responsibility.component';

@NgModule({
  declarations: [
	ReferenteAziendaComponent,
	ReferenteAziendaAdministrationComponent,
	ReferenteAziendaAccountsComponent,
	ReferenteAziendaRegisterComponent,
	ReferenteAziendaResponsibilityComponent
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
	ButtonModule,
	ConfirmPopupModule,
	TreeTableModule,
	AccordionModule,
	StepperModule
  ],
  providers: [
	
  ],
  exports: [
	ReferenteAziendaComponent
  ]
})
export class ReferenteAziendaModule {}