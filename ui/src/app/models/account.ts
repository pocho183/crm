import { Transform, Type } from 'class-transformer';
import { Company } from './company';
import { RoleTypes, StatusTypes } from './enumTypes'

export class Account {
	id?: number;
	@Type(() => Date)
	createdAt?: Date;
	email?: string;
	password?: string;
	name?: string;
	surname?: string;
	phone?: string;
	label?: string;
	@Transform(({ value }) => { 
		if (StatusTypes[value as keyof typeof StatusTypes]) return StatusTypes[value as keyof typeof StatusTypes]; 
		else return null; 
	}, { toPlainOnly: true })
	status?: StatusTypes;
	@Type(() => Company)
	company?: Company;
	@Transform(({ value }) => { 
		if (RoleTypes[value as keyof typeof RoleTypes]) return RoleTypes[value as keyof typeof RoleTypes]; 
		else return null; 
	}, { toPlainOnly: true })
	role?: RoleTypes;
	@Type(() => Date)
	lastConnection?: Date;
}
