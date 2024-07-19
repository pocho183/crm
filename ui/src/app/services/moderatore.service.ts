import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { Account } from '../models/account';
import { Company } from '../models/company';
import { Responsibility, ResFunction } from '../models/responsibility';
import { ResponsabilityTypes } from '../models/enumTypes';

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
  	
  	moderatoreLoadResponsability(id: number, responsabilityTypes: ResponsabilityTypes): Observable<Responsibility[]> {
		const url = "/moderatore/responsability/load";
		const params = new HttpParams().set('id', id).set('responsabilityTypes', responsabilityTypes);
    	return this.http.post<Responsibility[]>(url,params).pipe(first(), map(res => {return plainToClass(Responsibility, res)}));    
	}
  	
  	moderatoreSave(responsability: Responsibility[]): Observable<Responsibility[]> {
		const url = "/moderatore/responsability/save";
    	return this.http.post<Responsibility[]>(url, responsability).pipe(first(), map(res => {return plainToClass(Responsibility, res)}));  
	}
	
	moderatoreDeleteResFunction(id: number): Observable<Responsibility> {
		const url = "/moderatore/responsability/delete";
		const params = new HttpParams().set('id', id);
    	return this.http.post<Responsibility>(url, params).pipe(first(), map(res => {return plainToClass(Responsibility, res)}));    
	}

}