import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SecurityService } from './security.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private securityService: SecurityService) { }
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		
        const currentUser = this.securityService.currentUser();
        
        if (currentUser) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
       	this.router.navigateByUrl('/login');
        return false;
    }
}