import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'pagenotfound',
	templateUrl: './pagenotfound.component.html',
	styleUrls: ['./pagenotfound.component.css']
})
export class PageNotFoundComponent {
	
	constructor(private router: Router) { }
	
	home() {
		this.router.navigateByUrl('/');
	}
}