import { Type } from 'class-transformer';
import 'reflect-metadata';

export class Responsibility {
    id?: string;
    functionResponsible?: string;
    @Type(() => NameResponsible)
    namesResponsible?: NameResponsible[];
    @Type(() => SubFunctionResponsible)
    subFunctions?: SubFunctionResponsible[];
}

export class SubFunctionResponsible {
	subFunctionResponsible?: string;
	@Type(() => NameResponsible)
	namesResponsible?: NameResponsible[];
}

export class NameResponsible {
	names?: string[];
}