import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { ACLService } from './acl.service';

@Directive({
	selector: '[hasRole]'
})
export class HasRoleDirective {

	roles: string[];
	
	constructor(private aclService: ACLService, private element: ElementRef, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
		
	}
	
	/*@Input()
	set hasRole(val: string[]) {
		console.log(val);
		this.roles = Array.isArray(val) ? val : [val];
		this.updateView();
	}*/
	
	private updateView() {
		this.aclService.isRole(this.roles).subscribe(hasRole => {
			console.log(hasRole);
			if(hasRole) {
				this.viewContainer.clear();
				this.viewContainer.createEmbeddedView(this.templateRef);
			} else
				this.viewContainer.clear();
		});
	}
}