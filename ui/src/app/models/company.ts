import { Transform, Type } from 'class-transformer';
import { Account } from './account';
import { StatusTypes } from './enumTypes'

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
	@Type(() => Date)
	createdAt?: Date;
}