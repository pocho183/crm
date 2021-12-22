import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WINDOW } from './window.provider';
import { SecurityService } from '../security/security.service';
import { DialogService } from 'primeng/dynamicdialog';
import { BusyService } from '../services/busy.service';
import { CrmError } from 'src/app/models/crm-error.model';
import { DialogErrorComponent } from 'src/app/components/dialog/dialog-error.component';
import { Router } from '@angular/router';

@Injectable()
export class BackEndInterceptor implements HttpInterceptor {

	constructor(@Inject(WINDOW) private window: Window, private security: SecurityService, private router: Router, private dialogService: DialogService, private busy: BusyService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if(req.url && !req.url.startsWith('http') && !req.url.startsWith('/assets')) {
			const port = environment.backEndPort ? ':' + environment.backEndPort : this.window.location.port;
			req = req.clone( {
				url: this.window.location.protocol + '//' + this.window.location.hostname + port + environment.backEnd + req.url
			});
		}
		if(this.security.token) {
			req = req.clone({
				setHeaders: {
				Authorization: 'Bearer ' + this.security.token
				}
			});
		}
		return next.handle(req).pipe(tap(
			next => {
				this.busy.setBusy(true);
				if(next instanceof HttpResponse) {
					this.security.refreshToken(next.headers.get('Authorization'));
				}
			},
			err => {
				this.busy.setBusy(false);
				if(err.status === 401) {
					console.log("Back-end interceptor ERROR 401 !");
					this.security.logout().subscribe(response => { this.router.navigateByUrl('/login'); });
				} else {
					this.handleError(err, next);
				}
			}
		), finalize(() => this.busy.setBusy(false)));
	}

	private handleError(response: HttpErrorResponse, next): void {
		
		console.log(response);
		console.log(response.error);
		console.log(next);
		if(next instanceof HttpResponse) {
			console.log(next.headers.get('Message'));
		}
		
		
		 if (response.error instanceof ErrorEvent) {
	      // A client-side or network error occurred. Handle it accordingly.
 			console.error('An error occurred:', response.error);
	      console.error('An error occurred:', response.error.message);
	    }
		
		let errorData: CrmError[] = new Array();
		if(response.status === 0) {
			let reachError = new CrmError();
			reachError.setNoResponse();
			errorData.push(reachError);
		} else if(response.status === 500) { 
			let reachError = new CrmError();
			reachError.code = response.status;
			errorData.push(reachError);
		} else {
			errorData = response.error;
		}
		this.dialogService.open(DialogErrorComponent, {
			data: errorData,
			header: "Attenzione!",
			width: '60vw'
		});
	}

/** Without Security
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url && (!req.url.startsWith('http') && !req.url.startsWith('/assets'))) {
      const port = environment.needPort ? environment.backEndPort : this.window.location.port;
      req = req.clone({
        url: this.window.location.protocol + '//' + this.window.location.hostname + ':' + port + environment.backEnd + req.url
      });
    }
    return next.handle(req);
  }
*/
}