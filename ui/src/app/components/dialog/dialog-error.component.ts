import { Component, OnInit } from '@angular/core';
import { CrmError } from '../../models/crm-error.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
	templateUrl: './dialog-error.component.html',
	styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent implements OnInit {

	errors!: CrmError[];

	constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

	ngOnInit() {		
		this.errors = this.config.data;
	}
}