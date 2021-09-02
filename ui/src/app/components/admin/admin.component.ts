import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';
import { User } from '../../security';

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	
	user: User;
	
	constructor(private router: Router, private authenticationService: SecurityService) { 
		this.authenticationService.user.subscribe( response => { this.user = response; });
	}

	ngOnInit(): void {}
	
	logout() {
		this.authenticationService.logout().subscribe(response => { this.router.navigateByUrl('/login'); });
	}
}