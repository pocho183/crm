import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User, JWTModel } from './security.model';
import { JwtHelper } from './jwt-helper';
import { map, first, tap } from 'rxjs/operators';
import { plainToClass } from "class-transformer";

@Injectable()
export class SecurityService {
	
	public currentUserSubject: BehaviorSubject<User>;
	public token?: string;
	public user: Observable<User>;
  
  	constructor(private http: HttpClient, private jwtHelper: JwtHelper) {
		this.currentUserSubject = new BehaviorSubject<User>({} as any);
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
		  
		  console.log("aaaaa");
		  
	    let params = new HttpParams().append("token", token).append("applicationCode", applicationCode);
	    return this.http.post<string>('/authenticate', params, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded' })})
				.pipe(first(), map(response => this.createUser(response)));
  	}
	
	refreshToken(token: string) {
		this.createUser(token);
	}

    logout(): Observable<boolean> {
		const url = "/logout";
    	return this.http.get<boolean>(url).pipe(first(), map(response => {
			sessionStorage.removeItem('currentUser');
			this.currentUserSubject.next({} as any);
			return true;
    	}));
    }

	currentUser(): User | null {
		if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
	    	return this.currentUserSubject.value;
	  	} else {
	    	const storedToken = sessionStorage.getItem("currentUser");
	    	if (storedToken) {
	      		this.createUser(storedToken);
	      		return this.currentUserSubject.value;
	    	} else {
	      		return null;
	    	}
	  	}
	}

	private createUser(token: string): boolean {
		if(this.token === token)
			return true;
		if (token && (!this.token || this.token !== token) ) {
			this.token = token;
			const jwtModel: JWTModel = JSON.parse(this.jwtHelper.decodeToken(token));
			if (jwtModel && jwtModel.user) {
				sessionStorage.setItem('currentUser', token);
				this.currentUserSubject.next(jwtModel.user);
				return true;
			} else return false;
		} else return false;
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