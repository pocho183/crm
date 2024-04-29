import { Component } from '@angular/core';
import { AdminComponent } from './components/admin/admin.component';
import { ManagerComponent } from './components/manager/manager.component';
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

	get isManager() {
        return this.user && this.user.roles === RoleTypes.MANAGER;
    }
	
}