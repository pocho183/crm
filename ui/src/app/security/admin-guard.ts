import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SecurityService } from './security.service';
import { RoleTypes } from '../models/enumTypes';

@Injectable()
export class AdminGuard implements CanActivate {

	constructor(private router: Router, private securityService: SecurityService) { }
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		
        const currentUser = this.securityService.currentUser();
		if(currentUser && currentUser.roles && currentUser.roles === RoleTypes.ADMIN) {
			return true;
        }
        // Inavlidate session
        this.securityService.logout();
       	this.router.navigateByUrl('/logout');
        return false;
    }
}