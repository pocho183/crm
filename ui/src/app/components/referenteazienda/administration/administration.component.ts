import { Component, OnInit } from '@angular/core';
import { Account } from '../../../models/account';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'referenteaziendaadministration',
	templateUrl: './administration.component.html',
	styleUrls: ['./administration.component.css']
})
export class ReferenteAziendaAdministrationComponent implements OnInit {

	editing: boolean = false;
	accounts: Account[] = [];
	account?: Account;
	items?: MenuItem[];
	activeItem?: MenuItem;
	active: string = '0';
	
	constructor() {}

    ngOnInit() {
        this.items = [
            {label: 'Gestione Utenti', tabindex: '0', icon: 'pi pi-fw pi-user',  command: (event) => { this.changeTab(event); } }
        ];
		this.activeItem = this.items[0];
    }
	
	changeTab(event: any): void {
	  this.active = event.item.tabindex;
	}


}
