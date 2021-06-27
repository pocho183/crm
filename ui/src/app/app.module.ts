import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
	AppComponent
  ],
  imports: [
	BrowserModule,
	SidebarModule,
	ButtonModule,
	RoutingModule
  ],
  providers: [
	
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}