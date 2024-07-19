import { Type, Transform } from 'class-transformer';
import { ResponsabilityTypes } from '../models/enumTypes';
import { Company } from '../models/company';
import { TreeNode } from 'primeng/api';
import 'reflect-metadata';

export class Responsibility {
   	id?: number;
   	@Type(() => Date)
   	updatedAt?: Date;
   	@Transform(({ value }) => { 
		if (ResponsabilityTypes[value as keyof typeof ResponsabilityTypes]) return ResponsabilityTypes[value as keyof typeof ResponsabilityTypes]; 
		else return null; 
	}, { toPlainOnly: true })
	responsabilityType?: ResponsabilityTypes;
	@Type(() => ResFunction)
	resFunctions? : ResFunction[];
	@Type(() => Company)
	company?: Company;
}

export class ResFunction {
	id?: number;
	position?:number;
	functionName?: string;
	name?: string;
	email?: string;
	phoneNumber?: string;
	@Type(() => ResFunction)
	resFunctions?: ResFunction[];
}