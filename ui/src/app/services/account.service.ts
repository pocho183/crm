import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { SelectItem } from 'primeng/api';
import { Account } from 'src/app/models/account';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {}
  
  saveAccount(account: Account) {
	const url = "/account/save";
    return this.http.post<Account>(url, account).pipe(first(), map(res => {return plainToClass(Account, res)}));
  }

}