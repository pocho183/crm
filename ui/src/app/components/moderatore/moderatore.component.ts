import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';
import { User } from '../../security';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'moderatore',
	templateUrl: './moderatore.component.html',
	styleUrls: ['./moderatore.component.css']
})
export class ModeratoreComponent implements OnInit {
	
	user?: User;
	
	constructor(
			private router: Router,
			private messageService: MessageService,
			private authenticationService: SecurityService) {
		this.authenticationService.user.subscribe( response => { this.user = response; });
	 }

	ngOnInit(): void {}
	
	showUser() {
		if(this.user) {
			this.messageService.add({severity:'info', summary: 'Info', detail: ' Ruolo: ' + this.user.roles + ', Società: ' + this.user.company, life:2000, closable: false }); 
		}
	}
	
}