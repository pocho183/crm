import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { Account } from '../models/account';
import { Company } from '../models/company';

@Injectable()
export class ModeratoreService {

  	constructor(private http: HttpClient) {}
  
  	moderatoreLoadAccounts(): Observable<Account[]> {
		const url = "/moderatore/account/load";
    	return this.http.get<Account[]>(url).pipe(first(), map(res => {return plainToClass(Account, res)}));
  	}
  
	moderatoreLoadCompanies(): Observable<Company[]> {
		const url = "/moderatore/company/load";
    	return this.http.get<Company[]>(url).pipe(first(), map(res => {return plainToClass(Company, res)}));
  	}
  
    moderatoreLoadCompany(company: string): Observable<Company> {
		const url = "/moderatore/company/load/" + company;
    	return this.http.get<Company>(url).pipe(first(), map(res => {return plainToClass(Company, res)}));
  	}

}