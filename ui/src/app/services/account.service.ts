import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { SelectItem } from 'primeng/api';
import { Account } from 'src/app/models/account';
import { User } from '../security';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {}
  
  adminLoadAccounts(): Observable<Account[]> {
	const url = "/account/admin/load";
    return this.http.get<Account[]>(url).pipe(first(), map(res => {return plainToClass(Account, res)}));
  }

  managerLoadAccounts(user: User): Observable<Account[]> {
	const url = "/account/manager/load";
    return this.http.post<Account[]>(url, user).pipe(first(), map(res => {return plainToClass(Account, res)}));
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