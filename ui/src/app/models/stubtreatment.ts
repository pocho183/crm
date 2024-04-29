import { Type } from 'class-transformer';
import 'reflect-metadata';

export class StubTreatment {
	@Type(() => Columns)
	columns?: Columns[];
	@Type(() => Rows)
    rows?: Rows[];
}

export class Columns {
	names?: any[];
}

export class Rows {
	names?: any[];
}