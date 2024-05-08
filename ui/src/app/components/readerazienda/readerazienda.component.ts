import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';
import { User } from '../../security';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'readerazienda',
	templateUrl: './readerazienda.component.html',
	styleUrls: ['./readerazienda.component.css']
})
export class ReaderAziendaComponent implements OnInit {
	
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
			this.messageService.add({severity:'info', summary: 'Info', detail: this.user.name + ' '+ this.user.surname + ', Ruolo: ' + this.user.roles + ', Società: ' + this.user.company, life:2000, closable: false }); 
		}
	}
	
}