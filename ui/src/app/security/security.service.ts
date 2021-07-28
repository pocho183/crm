import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User, JWTModel } from './security.model';
import { JwtHelper } from './jwt-helper';
import { map, first, tap } from 'rxjs/operators';
import { plainToClass } from "class-transformer";

@Injectable()
export class SecurityService {
	
	private currentUserSubject: BehaviorSubject<User>;
	public token: string;
	public user: Observable<User>;
  
  constructor(private http: HttpClient, private jwtHelper: JwtHelper) {
		this.currentUserSubject = new BehaviorSubject<User>(null);
		this.user = this.currentUserSubject.asObservable();	
	}

  login(username: string, password: string): Observable<boolean> {
	const url = '/login';
	const params = new HttpParams().set('username', username).set('password', password);
 	return this.http.post<UserResponse>(url, params).pipe(first(), map(response => {
		return this.createUser(response.token);
    }));
  }

  authenticate(token: string, applicationCode: string): Observable<boolean> {
    let params = new HttpParams().append("token", token).append("applicationCode", applicationCode);
    return this.http.post<string>('/authenticate', params, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded' })})
			.pipe(first(), map(response => this.createUser(response)));
  }
	
	refreshToken(token: string) {
		this.createUser(token);
	}

  logout(): Observable<boolean> {
    return this.http.get<boolean>('/logout').pipe(first(), tap(() => {
		sessionStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}));
  }

	currentUser(): User {
		if(this.token && !this.jwtHelper.isTokenExpired(this.token))
			return this.currentUserSubject.value;
		else
			this.createUser(sessionStorage.getItem('currentUser'));
		return this.currentUserSubject.value ? this.currentUserSubject.value : null; 
	}
	
	private createUser(token: string): boolean {
		if(token && (!this.token || this.token !== token)) {
			this.token = token;
//			if(!this.jwtHelper.isTokenExpired(token, 1800)) {
				const jwtModel: JWTModel = JSON.parse(this.jwtHelper.decodeToken(token));
				sessionStorage.setItem('currentUser', token);
				console.log('ChangeUser');
				this.currentUserSubject.next(jwtModel.user);
				return true;
//			} else {
//				sessionStorage.removeItem('currentUser');
//				this.currentUserSubject.next(null);
//				this.token = null;
//			}
		}
		return false;
	}
	
	private isExpired(expiration: Date): boolean {
		console.log(expiration);
		console.log(new Date());
		return (new Date().getTime() - Number(expiration + '000')) > 3600000;
	}
}

export interface UserResponse {
  token: string;
}