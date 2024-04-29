export class CrmError {
	
	code?: number;
	context?: string;
	message?: string;
	
	public setNoResponse() {
		this.code = 9999;
		this.context = 'Networking error';
		this.message = 'Service not available';
	}
}