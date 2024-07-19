import { Component, OnInit, ViewChild  } from '@angular/core';
import { Account } from '../../../../models/account';
import { Company } from '../../../../models/company';
import { SelectItem } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';
import { AccountService } from '../../../../services/account.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleTypes } from '../../../../models/enumTypes';
import { Table } from 'primeng/table'

@Component({
	selector: 'accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
	
	account?: Account;
	accounts: Account[] = [];
	roles?: SelectItem[];
	statuses?: SelectItem[];
	companies: Company[] = [];
	@ViewChild('dt') dt: Table | undefined;
	
	constructor(
		private adminService: AdminService,
		private accountService: AccountService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService) {}

    ngOnInit() {
		this.roles  = [
			{label: 'Tecnico Software', value: 'ADMIN'},
			{label: 'Moderatore', value: 'MODERATORE'},
			{label: 'Referente Azienda', value: 'REFERENTEAZIENDA'},
			{label: 'Referente Cliente', value: 'REFERENTECLIENTE'},
			{label: 'Reader Azienda', value: 'READERAZIENDA'},
			{label: 'Reader Cliente', value: 'READERCLIENTE'}
		];
		this.statuses  = [{label: 'Attivo', value: 'ACTIVE'},{label: 'Sospeso', value: 'SUSPENDED'}];
		// Load accounts
		this.loadAccounts();
		// Call to back-end companies
		this.adminService.adminLoadCompanies().subscribe(response => {
			this.companies = response;
		});
	}
	
	applyFilterGlobal($event: any, stringVal: any) {
	  this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
	}
	
	createAccount() {
		let countNewAccount = 0;
		this.accounts.forEach(a => { if(a.id == null) { countNewAccount++; } });
		if(countNewAccount == 0) {
			this.account = new Account();
			let tmp = [...this.accounts];
			tmp.unshift(this.account);
			this.accounts = tmp;
		}
	}

	onRowEditSave(account: Account) {
        if (account.password != null && account.email != null && account.password != "" && account.email != "") {
			if(account.role == RoleTypes.ADMIN)
        		account.company = undefined;
			this.accountService.saveAccount(account).subscribe(response => {
				this.loadAccounts();
			}, error => { this.messageService.add({severity:'error', summary: 'Errore', detail:'L\'utente è NON è stato salvato', closable: false, life: 2000}); });
        }  
        else {
            this.messageService.add({severity:'error', summary: 'Errore', detail:'Account non valido', closable: false, life: 2000});
        }
    }

    onRowEditCancel(account: Account, index: number, event: Event) {
		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: "Attenzione ! Sei sicuro di cancellare definitivamente il record ?",
			icon: "pi pi-exclamation-triangle",
			acceptLabel: "No",
			rejectLabel: "Si",
			reject: () => {
				if(account.email && account.password) {
					this.accountService.deleteAccount(account).subscribe(response => {
						this.loadAccounts();
					}, error => { this.messageService.add({severity:'error', summary: 'Errore', detail:'Utente NON trovato !', closable: false, life: 2000}); });
				}
				else this.loadAccounts();
			}
		});
	}

	loadAccounts() {
		this.adminService.adminLoadAccounts().subscribe(response => {
			this.accounts = this.reduceText(response);
		});
	}
	
	reduceText(accounts: Account[]): Account[] {
		accounts.forEach( a => {
			if(a.name)
				a.name = a.name.length > 20 ? a.name.substring(0, 20) + '...' : a.name ;
			if(a.surname)
				a.surname = a.surname.length > 20 ? a.surname.substring(0, 20) + '...' : a.surname ;
			if(a.email)
				a.email = a.email.length > 30 ? a.email.substring(0, 30) + '...' : a.email ;
		});
		return accounts;
	}

}
