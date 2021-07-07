import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Company } from 'src/app/models/company';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
	selector: 'accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
	
	editing: boolean = false;
	account: Account;
	accounts: Account[] = [];
	clonedAccounts: { [s: string]: Account; } = {};
	roles: SelectItem[];
	statuses: SelectItem[];
	companies: Company[] = [];
	
	constructor(private accountService: AccountService, private messageService: MessageService) {}

    ngOnInit() {
		this.roles  = [{label: 'Admin', value: 'ADMIN'},{label: 'Manager', value: 'MANAGER'},{label: 'User', value: 'USER'},{label: 'Reader', value: 'READER'}];
		this.statuses  = [{label: 'Attivo', value: 'ACTIVE'},{label: 'Sospeso', value: 'SUSPENDED'}];
		// Call to back-end companies
		// this.companies = ...
	}
	
	createAccount() {
		this.account = new Account();
		this.accounts.push(this.account);
	}
	
	onRowEditInit(account: Account) {
        this.clonedAccounts[account.id] = {...account};
    }

	onRowEditSave(account: Account) {
        if (account.password != null && account.email != null) {
            //delete this.clonedAccounts[account.id];
			this.accountService.saveAccount(account).subscribe(response => {			
			});
            this.messageService.add({severity:'success', summary: 'Success', detail:'Account aggiornato'});
        }  
        else {
            this.messageService.add({severity:'error', summary: 'Error', detail:'Account non valido'});
        }
    }

    onRowEditCancel(account: Account, index: number) {
        this.accounts[index] = this.clonedAccounts[account.id];
        delete this.accounts[account.id];
    }
}
