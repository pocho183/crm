import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WINDOW_PROVIDERS } from './extension/window.provider';
import { BackEndInterceptor } from './extension/back-end-interceptor';

import { AdminService } from './services/admin.service';
import { ModeratoreService } from './services/moderatore.service';
import { ReferenteAziendaService } from './services/referenteazienda.service';
import { AccountService } from './services/account.service';
import { CompanyService } from './services/company.service';
import { DialogService } from 'primeng/dynamicdialog';
import { BusyService } from "./services/busy.service";

import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';

import { AdminModule } from './components/admin/admin.module';
import { ModeratoreModule } from './components/moderatore/moderatore.module';
import { ReferenteAziendaModule } from './components/referenteazienda/referenteazienda.module';
import { ReferenteClienteModule } from './components/referentecliente/referentecliente.module';
import { ReaderAziendaModule } from './components/readerazienda/readerazienda.module';
import { ReaderClienteModule } from './components/readercliente/readercliente.module';
import { SecurityModule } from './security';
import { DragDropModule } from 'primeng/dragdrop';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DialogErrorComponent } from './components/dialog/dialog-error.component';

@NgModule({
  declarations: [ 
	  AppComponent, 
	  DashboardComponent,
	  DialogErrorComponent,
	  PageNotFoundComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	AdminModule,
	ModeratoreModule,
	ReferenteAziendaModule,
	ReferenteClienteModule,
	ReaderAziendaModule,
	ReaderClienteModule,
	ButtonModule,
	FormsModule,
	BrowserAnimationsModule,
	ReactiveFormsModule,
	ProgressSpinnerModule,
	TableModule,
	TreeTableModule,
	AppRoutingModule,
	SecurityModule,
	DragDropModule
  ],
  exports: [  ],
  providers: [
	AdminService,
	ModeratoreService,
	ReferenteAziendaService,
	BusyService,
	DialogService,
	WINDOW_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: BackEndInterceptor, multi: true },
	AccountService,
	CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}