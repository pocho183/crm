import { Transform, Type } from 'class-transformer';
import { Account } from './account';
import { StatusTypes } from './enumTypes'
import { CompanyTypes } from './enumTypes'

export class Company {
	id?: number;
	name?: string;
	email?: string;
	phone?: string;
	label?: string;
	@Transform(({ value }) => { 
		if (StatusTypes[value as keyof typeof StatusTypes]) return StatusTypes[value as keyof typeof StatusTypes]; 
		else return null; 
	}, { toPlainOnly: true })
	status?: StatusTypes;
	@Transform(({ value }) => { 
		if (CompanyTypes[value as keyof typeof CompanyTypes]) return CompanyTypes[value as keyof typeof CompanyTypes]; 
		else return null; 
	}, { toPlainOnly: true })
	companyType?: CompanyTypes;
	@Type(() => Date)
	createdAt?: Date;
}