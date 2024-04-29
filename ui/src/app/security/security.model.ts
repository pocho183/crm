import { Transform, Type } from 'class-transformer';
import { RoleTypes, StatusTypes } from '../models/enumTypes'
import { Company } from '../models/company';

export class User {
  	username?: string;
  	email?: string;
  	name?: string;
  	surname?: string;
  	@Transform(({ value }) => { 
		if (RoleTypes[value as keyof typeof RoleTypes]) return RoleTypes[value as keyof typeof RoleTypes]; 
		else return null; 
	}, { toPlainOnly: true })
  	roles?: RoleTypes;
  	company?: string;
}

export class JWTModel {
	iss?: string;
	sub?: string;
	@Type(() => User)
	user?: User;
	@Type(() => Date)
	iat?: Date;
	@Type(() => Date)
	exp?: Date;
}