import { Transform, Type } from 'class-transformer';

export class Company {
	id: number;
	@Type(() => Date)
	createdAt: Date;
	name: string;
	email: string;
	phone: string;
	label: string;
	active: boolean;
}