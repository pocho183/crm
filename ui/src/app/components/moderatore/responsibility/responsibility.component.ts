import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Responsibility, ResFunction } from '../../../models/responsibility';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../../security/security.service';
import { ModeratoreService } from '../../../services/moderatore.service';
import { CompanyService } from '../../../services/company.service';
import { TreeNode } from 'primeng/api';
import { ResponsabilityTypes } from '../../../models/enumTypes';
import { User } from '../../../security';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../models/company';


@Component({
	selector: 'responsibility',
	templateUrl: './responsibility.component.html',
	styleUrls: ['./responsibility.component.css']
})
export class ResponsibilityComponent implements OnInit {
	
	//'Small': 'p-datatable-sm','Normal': '','Large': 'p-datatable-lg'
	selectedSize: any = 'p-datatable-sm';
	title?: string;
	paramSubscription?: Subscription;
	typeResponsability?: ResponsabilityTypes;
	user?: User;
	company?: Company;
	responsibilityTreeNodes: TreeNode[] = [];
  	rowData: TreeNode[] = [];
	totalRecords: number = 0;
	lastUpdate: Date = new Date(0);
	
	constructor(private router: Router,
		private route: ActivatedRoute,
		private messageService: MessageService,
		private moderatoreService: ModeratoreService,
		private confirmationService: ConfirmationService,
		private companyService: CompanyService,
		private cd: ChangeDetectorRef,
		private authenticationService: SecurityService) 
		{ 
			this.authenticationService.user.subscribe( response => { this.user = response; });
			if(this.user && this.user.company) {
				this.companyService.loadCompanyByName(this.user.company).subscribe( response => { 
					this.company = response;
					this.loadResponsability();
				});
				 
			}
		}

  	ngOnInit() {
		this.paramSubscription = this.route.params.subscribe((params: Params) => {
		    // Read URL Loading INTERNAL OR EXTERNAL Responsability
		    const paramValue = params['type']; // type: defined in the routing
		    if(paramValue == 'in') {
		    	this.typeResponsability = ResponsabilityTypes.INTERNAL;
		    	this.loadResponsability();
		    } else {
		    	this.typeResponsability = ResponsabilityTypes.EXTERNAL;
		    	this.loadResponsability();
		    }
		    // Dynamic title
		    this.title = paramValue == 'in' ? 'Identificazione delle responsabilità del responsabile' : 'Identificazione delle responsabilità del responsabile esterno incaricato da: ' + this.user?.company;
	    });	
    }
    
    ngOnDestroy() {
		if (this.paramSubscription) {
	    	this.paramSubscription.unsubscribe();
	  	}
	}
    
    loadResponsability() {
		
		
		
		
		/*let company: Company = { id: 1 };
		const responsibilities: Responsibility[] = 
	    [
	      	{ id: 1, updatedAt: new Date(), company: company, responsabilityType: ResponsabilityTypes.INTERNAL, resFunctions: 
	      		[
	          		{ id: 2, functionName: 'Manage Users', name: '2John Doe', email: 'john.doe@example.com', phoneNumber: '1234567890' },
	          		{ id: 3, functionName: 'Director', name: '3Jane Smith', email: 'jane.smith@example.com', phoneNumber: '0987654321', resFunctions: 
	          			[{
							id: 4, functionName: 'SUB Director', name: '4DAVID', email: 'jane.smith@example.com', phoneNumber: '0987654321', resFunctions:[]  
						}] 
					}
	          	]
	      	},
	      	{ id: 5, updatedAt: new Date(), company: company, responsabilityType: ResponsabilityTypes.INTERNAL, resFunctions: 
	      	  	[
	          		{ id: 6, functionName: 'Head of Development', name: '6John Doe', email: 'john.doe@example.com', phoneNumber: '1234567890', resFunctions:
	          			[{
							id: 7, functionName: 'SUB SUB Director', name: '7DAVID', email: 'jane.smith@example.com', phoneNumber: '0987654321', resFunctions:[]  
						}] 
	          		}    	
	          	]
	      	}
      	];*/
      	
      	if(this.company && this.company.id && this.typeResponsability) {
	      	this.moderatoreService.moderatoreLoadResponsability(this.company.id, this.typeResponsability).subscribe( response => {
				if(response) {
					this.responsibilityTreeNodes = this.transformResponsibilitiesToTreeNodes(response);
					// Calculate the lastUpdate date
	            const lastUpdateDate = response.reduce((latest, current) => { if (!current.updatedAt) return latest; return (!latest || current.updatedAt > latest) ? current.updatedAt : latest; }, undefined as Date | undefined);					
				this.lastUpdate = lastUpdateDate || new Date(0);
				this.loadChildNodes();
				}
			}, error => { this.messageService.add({severity:'error', summary: 'Errore', detail:'L\'utente è NON è stato salvato', closable: false, life: 2000}); });      
    	}
      	
      	
      	
      	//this.responsibilityTreeNodes = this.transformResponsibilitiesToTreeNodes(responsibilities);
      	//this.loadChildNodes();
	}	
	
	loadChildNodes() {
		this.rowData = this.flattenResponsibilities();
		this.sortRowData(this.rowData);
	}
	
	flattenResponsibilities(): TreeNode[] {
		const childResFunctions: TreeNode[] = [];
	    this.responsibilityTreeNodes.forEach(responsibilityNode => {
	    	if (responsibilityNode.children)
	        	childResFunctions.push(...responsibilityNode.children);
	    });
	    this.totalRecords = childResFunctions.length;
	    return childResFunctions;
	}
	
	sortRowData(nodes: TreeNode[]) {
	    nodes.sort((a, b) => {
	        const posA = a.data.position;
	        const posB = b.data.position;
	        if (posA < posB) return -1;
	        if (posA > posB) return 1;
	        return 0;
	    });
	    // Recursively sort children
	    nodes.forEach(node => {
	        if (node.children) {
	            this.sortRowData(node.children);
	        }
	    });
	}

	transformResponsibilitiesToTreeNodes(responsibilities: Responsibility[]): TreeNode[] {
		let treeNodes: TreeNode[] = [];
	    responsibilities.forEach(responsibility => {
	        // Include parent information even though it's not displayed
	        const responsibilityNode = {
	            data: {
	                id: responsibility.id,
	                updatedAt: responsibility.updatedAt,
	                company: responsibility.company,
	                responsabilityType: responsibility.responsabilityType,
	                parent: responsibility // Include parent information here
	            },
	            children: this.transformResFunctionsToTreeNodes(responsibility.resFunctions || []),
	            expanded: false
	        };
	        treeNodes.push(responsibilityNode);
	    });
	    return treeNodes;
	}

	transformResFunctionsToTreeNodes(resFunctions: ResFunction[]): TreeNode[] {
		return resFunctions.map(resFunction => ({
	    	data: {
		        id: resFunction.id,
		        position: resFunction.position,
		        functionName: resFunction.functionName,
		        name: resFunction.name,
		        email: resFunction.email,
		        phoneNumber: resFunction.phoneNumber
	      	},
	      	children: this.transformResFunctionsToTreeNodes(resFunction.resFunctions || []),
	      	expanded: false
		}));
	}

	convertTreeNodesToResponsibilities(treeNodes: TreeNode[]): Responsibility[] {
		const responsibilities: Responsibility[] = [];
	    treeNodes.forEach(node => {
	    	const responsibility = new Responsibility();
	        responsibility.id = node.data.id;
	        responsibility.updatedAt = node.data.updatedAt;
	        responsibility.company = node.data.company;
	        responsibility.responsabilityType = node.data.responsabilityType;
	        if (node.children && node.children.length > 0) {
	            responsibility.resFunctions = this.convertTreeNodesToResFunctions(node.children);
	        }
	        responsibilities.push(responsibility);
	    });
	    return responsibilities;
	}

	convertTreeNodesToResFunctions(treeNodes: TreeNode[]): ResFunction[] {
		return treeNodes.map(node => {
	    	const resFunction = new ResFunction();
	    	resFunction.id = node.data.id;
	    	resFunction.position = node.data.position;
	      	resFunction.functionName = node.data.functionName;
	      	resFunction.name = node.data.name;
	      	resFunction.email = node.data.email;
	      	resFunction.phoneNumber = node.data.phoneNumber;
	      	resFunction.resFunctions = this.convertTreeNodesToResFunctions(node.children || []);
	      	return resFunction;
	    });
	}
	
	onRowEditSave() {
		let originalResponsibilities: Responsibility[] = this.convertTreeNodesToResponsibilities(this.responsibilityTreeNodes);
		this.moderatoreService.moderatoreSave(originalResponsibilities).subscribe( response => {
			this.responsibilityTreeNodes = this.transformResponsibilitiesToTreeNodes(response);
			this.loadChildNodes();
		}, error => { this.messageService.add({severity:'error', summary: 'Errore', detail:'L\'utente è NON è stato salvato', closable: false, life: 2000}); });      
    }
    
    addResponsability() {		
	    let initialResFunction: ResFunction = { id: undefined, position: undefined, functionName: '', name: '', email: '', phoneNumber: '', resFunctions: [] };
    	let initialResFunctionNode: TreeNode = {
	        data: {
	            id: initialResFunction.id,
	            position: initialResFunction.position,
	            functionName: initialResFunction.functionName,
	            name: initialResFunction.name,
	            email: initialResFunction.email,
	            phoneNumber: initialResFunction.phoneNumber,
	        },
	        children: [],
	        expanded: true
    	};
    	let responsibilityNode: TreeNode = {
	        data: {
	            id: undefined,
	            updatedAt: new Date(),
	            company: this.company,
	            responsabilityType: this.typeResponsability,
	            parent: null
	        },
	        children: [initialResFunctionNode],
	        expanded: true
    	};
    	this.responsibilityTreeNodes.unshift(responsibilityNode);
    	this.loadChildNodes();
    	this.cd.detectChanges();
	}
	
	
	addSubResponsability(parentNode: any) {
        const newChild: TreeNode = {
            data: {
                id: null,
                position: null,
                functionName: '',
                name: '',
                email: '',
                phoneNumber: '',
                updatedAt: new Date(),
                company: parentNode.company,
                responsabilityType: parentNode.responsabilityType
            },
            children: [],
            expanded: true
        };

        if (!parentNode.children) {
            parentNode.children = [];
        }

        parentNode.node.children.unshift(newChild);
        parentNode.node.expanded = true;
        this.loadChildNodes();
    }
  
    onRowEditCancel(rowData: any, event: Event) {
		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: "Attenzione ! Sei sicuro di cancellare definitivamente il record ?",
			icon: "pi pi-exclamation-triangle",
			acceptLabel: "No",
			rejectLabel: "Si",
			reject: () => {
				const resFunctionId = rowData.id;
        		if (resFunctionId) {
					this.moderatoreService.moderatoreDeleteResFunction(resFunctionId).subscribe(response => {
						this.loadResponsability();
					}, error => { this.messageService.add({severity:'error', summary: 'Errore', detail:'La Responsabilità NON può essere cancellata !', closable: false, life: 2000}); });
				}
				else this.loadResponsability();
			}
		});
	}
}