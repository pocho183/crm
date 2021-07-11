import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WINDOW_PROVIDERS } from './extension/window.provider';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackEndInterceptor } from './extension/back-end-interceptor';

import { AdminModule } from './components/admin/admin.module';
import { ManagerModule } from './components/manager/manager.module';

import { AccountService } from 'src/app/services/account.service';
import { CompanyService } from 'src/app/services/company.service';

import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component'

@NgModule({
  declarations: [
	AppComponent,
	PageNotFoundComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	AdminModule,
	ManagerModule,
	SidebarModule,
	ToolbarModule,
	ButtonModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [
	WINDOW_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: BackEndInterceptor, multi: true },
	AccountService,
	CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}