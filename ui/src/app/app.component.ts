import { Component } from '@angular/core';
import { AdminComponent } from './components/admin/admin.component';
import { ModeratoreComponent } from './components/moderatore/moderatore.component';
import { SecurityService } from './security/security.service';
import { User } from './security';
import { RoleTypes } from '../app/models/enumTypes';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	
		
	user?: User;
	
	constructor(private securityService: SecurityService) { 
		this.securityService.user.subscribe( response => { this.user = response; });
	}
	
	get isAdmin() {
        return this.user && this.user.roles === RoleTypes.ADMIN;
    }

	get isModeratore() {
        return this.user && this.user.roles === RoleTypes.MODERATORE;
    }
    
    get isReferenteAzienda() {
        return this.user && this.user.roles === RoleTypes.REFERENTEAZIENDA;
    }
    
    get isReferenteCliente() {
        return this.user && this.user.roles === RoleTypes.REFERENTECLIENTE;
    }
    
    get isReaderAzienda() {
        return this.user && this.user.roles === RoleTypes.READERAZIENDA;
    }
    
    get isReaderCliente() {
        return this.user && this.user.roles === RoleTypes.READERCLIENTE;
    }
	
}