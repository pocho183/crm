import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { SelectItem } from 'primeng/api';
import { Account } from '../models/account';
import { User } from '../security';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {}
  
  adminLoadAccounts(): Observable<Account[]> {
	const url = "/admin/account/load";
    return this.http.get<Account[]>(url).pipe(first(), map(res => {return plainToClass(Account, res)}));
  }
  
  moderatoreLoadAccounts(): Observable<Account[]> {
	const url = "/moderatore/account/load";
    return this.http.get<Account[]>(url).pipe(first(), map(res => {return plainToClass(Account, res)}));
  }

  saveAccount(account: Account) {
	const url = "/account/save";
    return this.http.post<Account>(url, account).pipe(first(), map(res => {return plainToClass(Account, res)}));
  }

  deleteAccount(account: Account) {
	const url = "/account/delete";
    return this.http.post<Account>(url, account).pipe(first(), map(res => {return plainToClass(Account, res)}));
  }

}