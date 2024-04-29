import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';
import { User } from '../../security';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	
	user?: User;
	
	constructor(
		private router: Router, 
		private authenticationService: SecurityService,
		private messageService: MessageService) { 
		this.authenticationService.user.subscribe( response => { this.user = response; });
	}

	ngOnInit(): void {}
	
	showUser() {
		if(this.user) {
			this.messageService.add({severity:'info', summary: 'Info', detail: this.user.name + ' '+ this.user.surname + ', Ruolo: ' + this.user.roles, life:2000, closable: false }); 
		}
	}
	
	//logout() {
		//this.authenticationService.logout().subscribe(response => { this.router.navigateByUrl('/login'); });
		//this.authenticationService.logout().subscribe(() => { console.log("Logout"); });
	//}
}