import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { SelectItem } from 'primeng/api';
import { CompanyService } from 'src/app/services/company.service';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';

@Component({
	selector: 'company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
	
	editing: boolean = false;
	company: Company;
	companies: Company[] = [];
	roles: SelectItem[];
	statuses: SelectItem[];
	
	constructor(
		private companyService: CompanyService, 
		private messageService: MessageService,
		private confirmationService: ConfirmationService) {}

    ngOnInit() {
		this.statuses  = [{label: 'Attivo', value: 'ACTIVE'},{label: 'Sospeso', value: 'SUSPENDED'}];
		// Load companies
		this.loadCompanies();
	}
	
	createCompany() {
		let countNewCompany = 0;
		this.companies.forEach(a => { if(a.id == null) { countNewCompany++; } });
		if(countNewCompany == 0) {
			this.company = new Company();
			let tmp = [...this.companies];
			tmp.unshift(this.company);
			this.companies = tmp;
		}
	}

	onRowEditSave(company: Company) {
        if (company.name != null && company.name != "") {
			this.companyService.saveCompany(company).subscribe(response => {
				this.loadCompanies();
			}, error => { this.messageService.add({severity:'error', summary: 'Errore', detail:'La società NON è stata salvata', closable: false, life: 2000}); });
        }  
        else {
            this.messageService.add({severity:'error', summary: 'Errore', detail:'Società non valida', closable: false, life: 2000});
        }
    }

    onRowEditCancel(company: Company, index: number, event: Event) {
		this.confirmationService.confirm({
			target: event.target,
			message: "Attenzione ! Sei sicuro di cancellare definitivamente il record ? Verranno cancellati TUTTI gli utenti associati",
			icon: "pi pi-exclamation-triangle",
			acceptLabel: "No",
			rejectLabel: "Si",
			reject: () => {
				if(company.name) {
					this.companyService.deleteCompany(company).subscribe(response => {
						this.loadCompanies();
					}, error => { this.messageService.add({severity:'error', summary: 'Errore', detail:'Cliente NON trovato !', closable: false, life: 2000}); });
				}
				else this.loadCompanies();
			}
		});
	}

	loadCompanies() {
		this.companyService.loadCompanies().subscribe(response => {
			this.companies = this.reduceText(response);
		});
	}
	
	reduceText(companies) {
		companies.forEach( a => {
			if(a.name)
				a.name = a.name.length > 20 ? a.name.substring(0, 20) + '...' : a.name ;
			if(a.email)
				a.email = a.email.length > 30 ? a.email.substring(0, 30) + '...' : a.email ;
		});
		return companies;
	}
	
}
