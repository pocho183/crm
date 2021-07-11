import { Transform, Type } from 'class-transformer';
import { Company } from './company';
import { RoleTypes, StatusTypes } from './enumTypes'

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
	@Transform(value => StatusTypes['value'], { toPlainOnly: true})
	status: StatusTypes;
	@Type(() => Company)
	company: Company;
	@Transform(value => RoleTypes['value'], { toPlainOnly: true})
	role: RoleTypes;
	@Type(() => Date)
	lastConnection: Date;
}
