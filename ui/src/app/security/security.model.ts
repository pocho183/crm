import { Transform, Type } from 'class-transformer';
import { RoleTypes, StatusTypes } from 'src/app/models/enumTypes'

export class User {
  username: string;
  email: string;
  name: string;
  surname: string;
  @Transform(value => RoleTypes['value'], { toPlainOnly: true})
  roles: RoleTypes;
}

export class JWTModel {
	iss: string;
	sub: string;
	@Type(() => User)
	user: User;
	@Type(() => Date)
	iat: Date;
	@Type(() => Date)
	exp: Date;
}