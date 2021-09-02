import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Company } from 'src/app/models/company';
import { SelectItem } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';
import { CompanyService } from 'src/app/services/company.service';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { User } from '../../../../security';
import { SecurityService } from '../../../../security/security.service';

@Component({
	selector: 'accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
	
	@Input() user: User;
	editing: boolean = false;
	account: Account;
	accounts: Account[] = [];
	roles: SelectItem[];
	statuses: SelectItem[];
	company: Company;
	
	constructor(
		private securityService: SecurityService,
		private accountService: AccountService,
		private companyService: CompanyService, 
		private messageService: MessageService,
		private confirmationService: ConfirmationService) {	
			this.securityService.user.subscribe( response => { this.user = response; });
		}

    ngOnInit() {
		this.roles  = [{label: 'Manager', value: 'MANAGER'},{label: 'User', value: 'USER'},{label: 'Reader', value: 'READER'}];
		this.statuses  = [{label: 'Attivo', value: 'ACTIVE'},{label: 'Sospeso', value: 'SUSPENDED'}];
		// Load accounts
		this.loadAccounts();
		this.loadCompany();
	}
	
	createAccount() {
		let countNewAccount = 0;
		this.accounts.forEach(a => { if(a.id == null) { countNewAccount++; } });
		if(countNewAccount == 0) {
			this.account = new Account();
			if(this.company)
				this.account.company = this.company;
			let tmp = [...this.accounts];
			tmp.unshift(this.account);
			this.accounts = tmp;
		}
	}

	onRowEditSave(account: Account) {
        if (account.password != null && account.email != null && account.password != "" && account.email != "") {
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
			target: event.target,
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
		this.accountService.managerLoadAccounts(this.user).subscribe(response => {
			this.accounts = this.reduceText(response);
		});
	}
	
	loadCompany() {
		if(this.user.company) {
			this.companyService.managerLoadCompany(this.user.company).subscribe(response => {
				this.company = response;
			});
		}
	}
	
	reduceText(accounts) {
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
