import { Transform, Type } from 'class-transformer';
import { Company } from './company';

export class Account {
	id: number;
	@Type(() => Date)
	createdAt: Date;
	email: string;
	password: string;
	name: string;
	surname: string;
	phone: string;
	label: string;
	status: string;
	@Type(() => Company)
	company: Company;
	@Transform(value => RoleTypes['value'], { toPlainOnly: true})
	role: RoleTypes;
	@Type(() => Date)
	lastConnection: Date;
}

export enum RoleTypes {
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	USER = 'USER',
	READER = 'READER'
}
