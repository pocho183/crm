import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth-guard';
import { AdminGuard } from './admin-guard';
import { ModeratoreGuard } from './moderatore-guard';
import { ReferenteAziendaGuard } from './referenteazienda-guard';
import { ReferenteClienteGuard } from './referentecliente-guard';
import { ReaderAziendaGuard } from './readerazienda-guard';
import { ReaderClienteGuard } from './readercliente-guard';

import { JwtHelper } from './jwt-helper';
import { SecurityService } from './security.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from './login.component';
import { SecurityRoutingModule } from './security-routing.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    HttpClientModule,
    ButtonModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    ModeratoreGuard,
    ReferenteAziendaGuard,
    ReferenteClienteGuard,
    ReaderAziendaGuard,
    ReaderClienteGuard,
    JwtHelper,
    SecurityService
  ],
  exports: [ ]
})
export class SecurityModule {}