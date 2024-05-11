import { Component, OnInit, ViewChild  } from '@angular/core';
import { Account } from '../../../../models/account';
import { Company } from '../../../../models/company';
import { SelectItem } from 'primeng/api';
import { AccountService } from '../../../../services/account.service';
import { SecurityService } from '../../../../security/security.service';
import { ReferenteAziendaService } from '../../../../services/referenteazienda.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleTypes } from '../../../../models/enumTypes';
import { Table } from 'primeng/table'
import { User } from '../../../../security';

@Component({
	selector: 'referenteaziendaaccounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css']
})
export class ReferenteAziendaAccountsComponent implements OnInit {
	
	user?: User;
	editing: boolean = false;
	account?: Account;
	accounts: Account[] = [];
	roles?: SelectItem[];
	statuses?: SelectItem[];
	companies: Company[] = [];
	@ViewChild('dt') dt: Table | undefined;
	
	constructor(
		private authenticationService: SecurityService,
		private accountService: AccountService,
		private refrenteAziendaService: ReferenteAziendaService, 
		private messageService: MessageService,
		private confirmationService: ConfirmationService) {
			this.authenticationService.user.subscribe( response => { this.user = response; });
			this.refrenteAziendaService.referenteAziendaLoadCompanies().subscribe(response => { this.companies = response });
		}

    ngOnInit() {
		this.roles  = [
			{label: 'Referente Cliente', value: 'REFERENTECLIENTE'},
			{label: 'Reader Cliente', value: 'READERCLIENTE'}
		];
		this.statuses  = [{label: 'Attivo', value: 'ACTIVE'},{label: 'Sospeso', value: 'SUSPENDED'}];
		// Load accounts
		this.loadAccounts();
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
			this.refrenteAziendaService.referenteAziendaLoadCompanies().subscribe( re => {
				const com = re.find(res => res['name'] === this.user?.company);
				account.company = com;
				this.accountService.saveAccount(account).subscribe(response => {
					// Reload
					this.loadAccounts();
				}, error => { this.messageService.add({severity:'error', summary: 'Errore', detail:'L\'utente è NON è stato salvato', closable: false, life: 2000}); });				
			});
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
		if (this.user && this.user.company) {
			this.refrenteAziendaService.referenteAziendaLoadAccounts(this.user.company).subscribe(response => {
				this.accounts = this.reduceText(response);
			});
		}
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
