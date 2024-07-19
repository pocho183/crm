import { Component, OnInit } from '@angular/core';
import { Account } from '../../../models/account';
import { Company } from '../../../models/company';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'moderatoreadministration',
	templateUrl: './administration.component.html',
	styleUrls: ['./administration.component.css']
})
export class ModeratoreAdministrationComponent implements OnInit {

	editing: boolean = false;
	accounts: Account[] = [];
	account?: Account;
	companies?: Company[];
	items?: MenuItem[];
	activeItem?: MenuItem;
	active: string = '0';
	
	constructor() {}

    ngOnInit() {
        this.items = [
			//{label: 'Gestione Società', tabindex: '0', icon: 'pi pi-fw pi-th-large', command: (event) => { this.changeTab(event); }},
            {label: 'Gestione Utenti', tabindex: '0', icon: 'pi pi-fw pi-user',  command: (event) => { this.changeTab(event); } }
        ];
		this.activeItem = this.items[0];
    }
	
	changeTab(event: any): void {
	  this.active = event.item.tabindex;
	}


}
