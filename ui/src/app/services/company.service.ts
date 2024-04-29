import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { SelectItem } from 'primeng/api';
import { Company } from '../models/company';

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) {}
  
  adminLoadCompanies(): Observable<Company[]> {
	const url = "/company/admin/load";
    return this.http.get<Company[]>(url).pipe(first(), map(res => {return plainToClass(Company, res)}));
  }

  managerLoadCompany(company: string): Observable<Company> {
	const url = "/company/manager/load/" + company;
    return this.http.get<Company>(url).pipe(first(), map(res => {return plainToClass(Company, res)}));
  }

  saveCompany(company: Company) {
	const url = "/company/save";
    return this.http.post<Company>(url, company).pipe(first(), map(res => {return plainToClass(Company, res)}));
  }

  deleteCompany(company: Company) {
	const url = "/company/delete";
    return this.http.post<Company>(url, company).pipe(first(), map(res => {return plainToClass(Company, res)}));
  }

}