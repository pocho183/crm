import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { Account } from '../models/account';
import { Company } from '../models/company';

@Injectable()
export class ReferenteAziendaService {

  	constructor(private http: HttpClient) {}
  
  	referenteAziendaLoadAccounts(company: string): Observable<Account[]> {
		const url = "/referenteazienda/account/load/" + company;
    	return this.http.get<Account[]>(url).pipe(first(), map(res => {return plainToClass(Account, res)}));
  	}
  	
  	referenteAziendaLoadCompanies(): Observable<Company[]> {
		const url = "/referenteazienda/company/load";
    	return this.http.get<Company[]>(url).pipe(first(), map(res => {return plainToClass(Company, res)}));
  	}

}