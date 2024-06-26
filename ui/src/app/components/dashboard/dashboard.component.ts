import { Component } from '@angular/core';
import { AdminComponent } from '../../components/admin/admin.component';
import { ModeratoreComponent } from '../../components/moderatore/moderatore.component';
import { SecurityService } from '../../security/security.service';
import { User } from '../../security';
import { RoleTypes } from '../../models/enumTypes';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

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
}
