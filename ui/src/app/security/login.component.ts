import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { environment } from '../../environments/environment';
import { SecurityService } from './security.service';

@Component( {
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit, OnDestroy {
  env: any = environment;
  username: string;
  password: string;
  loading = false;
  error = '';
  destroyed = new Subject<any>();
  
  constructor(private router: Router, private authenticationService: SecurityService) {
    if(router.url === '/logout') {
      authenticationService.logout().subscribe(response => {
        if(response) {
          router.navigateByUrl('/login');
        }
      });
    }
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.username, this.password).subscribe(result => {
	if(result) {
        this.router.navigate(['/']);
        this.loading = false;
      } else {
        this.loading = false;
        this.error = 'Authentication failed';
      }
    },
    err => {
      this.loading = false;
      this.error = 'Authentication failed';
    });
  }
}