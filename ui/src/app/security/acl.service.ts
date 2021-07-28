import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import * as _ from 'lodash';
import { User } from './security.model';
import { SecurityService } from './security.service';

@Injectable()
export class ACLService {
	
	constructor(private securityService: SecurityService) {}
	
	can(permission: string): boolean {
		return true;
//		return permission == this.securityService.currentUser().role;
	}
	
	isRole(role): Observable<boolean> {
		return this.securityService.user.pipe(map(user => {
			return user && user.roles ? user.roles == role : false;
		}));
	}
}