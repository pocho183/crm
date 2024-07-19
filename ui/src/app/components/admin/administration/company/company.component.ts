import { Component, OnInit, ViewChild  } from '@angular/core';
import { Company } from '../../../../models/company';
import { SelectItem } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';
import { CompanyService } from '../../../../services/company.service';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table'

@Component({
	selector: 'company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
	
	company?: Company;
	companies: Company[] = [];
	roles?: SelectItem[];
	statuses?: SelectItem[];
	companyTypes?: SelectItem[];
	@ViewChild('dt') dt: Table | undefined;
	
	constructor(
		private adminService: AdminService,
		private companyService: CompanyService, 
		private messageService: MessageService,
		private confirmationService: ConfirmationService) {}

    ngOnInit() {
		this.statuses  = [{label: 'Attivo', value: 'ACTIVE'},{label: 'Sospeso', value: 'SUSPENDED'}];
		this.companyTypes = [{label: 'Referente', value: 'REFERENTE'},{label: 'Cliente', value: 'CLIENTE'}];
		// Load companies
		this.loadCompanies();
	}
	
	applyFilterGlobal($event: any, stringVal: any) {
	  this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
	}
	
	 onRowEditInit() {
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
			target: event.target as EventTarget,
			message: "Attenzione ! Sei sicuro di cancellare definitivamente il record ? Verranno cancellati TUTTI gli utenti associati",
			icon: "pi pi-exclamation-triangle",
			acceptLabel: "No",
			rejectLabel: "Si",
			reject: () => {
				if (company.name) { 
					this.companyService.deleteCompany(company).subscribe(
				    	() => { this.loadCompanies(); },
				    	(error: HttpErrorResponse) => { this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'Cliente NON trovato !', closable: false, life: 2000 }); });
				} else {
				  this.loadCompanies();
				}
			}
		});
	}

	loadCompanies() {
		this.adminService.adminLoadCompanies().subscribe((response: Company[]) => {
		    this.companies = this.reduceText(response);
		});
	}
	
	reduceText(companies: Company[]): Company[] {
		companies.forEach( a => {
			if(a.name)
				a.name = a.name.length > 20 ? a.name.substring(0, 20) + '...' : a.name ;
			if(a.email)
				a.email = a.email.length > 30 ? a.email.substring(0, 30) + '...' : a.email ;
		});
		return companies;
	}
	
}
