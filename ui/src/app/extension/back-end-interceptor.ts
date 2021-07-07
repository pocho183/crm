import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WINDOW } from './window.provider';

@Injectable()
export class BackEndInterceptor implements HttpInterceptor {

	constructor(@Inject(WINDOW) private window: Window) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url && (!req.url.startsWith('http') && !req.url.startsWith('/assets'))) {
      console.log(this.window.location.port);
      const port = environment.needPort ? environment.backEndPort : this.window.location.port;
      req = req.clone( {
        url: this.window.location.protocol + '//' + this.window.location.hostname + ':' + port + environment.backEnd + req.url
      });
    }
    return next.handle(req);
  }
}