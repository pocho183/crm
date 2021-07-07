import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Company } from 'src/app/models/company';
import { MenuItem } from 'primeng/api';

import { AccountsComponent } from './accounts/accounts.component';
import { ClientsComponent } from './clients/clients.component';

@Component({
	selector: 'administration',
	templateUrl: './administration.component.html',
	styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

	editing: boolean = false;
	accounts: Account[] = [];
	account: Account;
	companies: Company[];
	items: MenuItem[];
	activeItem: MenuItem;
	active: string = '0';
	
	constructor() {}

    ngOnInit() {
        this.items = [
            {label: 'Gestione Utenti', tabindex: '0', icon: 'pi pi-fw pi-home',  command: (event) => { this.changeTab(event); } },
            {label: 'Gestione Clienti', tabindex: '1', icon: 'pi pi-fw pi-calendar', command: (event) => { this.changeTab(event); }}
        ];
		this.activeItem = this.items[0];
    }
	
	changeTab(event) {
		this.active = event.item.tabindex;
	}
	
	onRowEditInit(account: Account) {
        
    }
}
