import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ACLService } from './acl.service';
import { SecurityService } from './security.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private securityService: SecurityService, private aclService: ACLService) { }
	
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