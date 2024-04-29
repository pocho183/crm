import { Component, OnInit, ViewChild } from '@angular/core';
import { Responsibility } from '../../../models/responsibility';
import { Table } from 'primeng/table';
import { TreeNode } from 'primeng/api';

@Component({
	selector: 'responsibility',
	templateUrl: './responsibility.component.html',
	styleUrls: ['./responsibility.component.css']
})
export class ResponsibilityComponent implements OnInit {
	
	//'Small': 'p-datatable-sm','Normal': '','Large': 'p-datatable-lg'
	selectedSize: any = 'p-datatable-sm';
	@ViewChild('dt1') dt1: Table | undefined;
	
	// STUB
	first: number = 1;
	last: number = 15;
	totalRecords: number = 200;

	resp: TreeNode[] = [
		{ data: { functionResponsible: "Legale rappresentante protempore", namesResponsible: "Andrea Artusi" } },
		{ data: { functionResponsible: "DPO Incaricato", namesResponsible: "Severino Cirimelli" } },
		{ data: { functionResponsible: "Responsabile commerciale area nord", namesResponsible: "Marco Dragoni" } },
		{ data: { functionResponsible: "Responsabile commerciale area centro sud", namesResponsible: "Andrea Artusi" } },
		{ data: { functionResponsible: "Referente commerciale", namesResponsible: "Giuliano Castaldi" } },
		{ data: { functionResponsible: "Responsabile Operations", namesResponsible: "Giancarlo Fortunato" }, expanded:false,
		  children: [
			  { data: { functionResponsible: "Responsabile dei sistemi informativi", namesResponsible: "Cristian Micarelli" } },
			  { data: { functionResponsible: "Referente lavorazioni e digitalizzazione", namesResponsible: "Emanuela Smarrazzo" } },
			  { data: { functionResponsible: "Referente archivi area nord", namesResponsible: "Salvatore Giordano" } },
		   ]
		},
		{ data: { functionResponsible: "Responsabile della conservazione a norma", namesResponsible: "Giuseppe Cannone" }, expanded:false,
		  children: [
			  { data: { functionResponsible: "Ufficio privacy", namesResponsible: "Walter Perropane - Davide Pacifici" }, expanded:false,
			  	children: [
				  { data: { functionResponsible: "ESEMPIO TERZA SOTTO FUNZIONE", namesResponsible: "ESEMPIO" } }
		   		]
			  }
		   ]
		}
		
	];

	constructor() {}

	ngOnInit(): void {}
    
    applyFilterGlobal($event: any, stringVal: any) {
    	this.dt1!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  	}
}