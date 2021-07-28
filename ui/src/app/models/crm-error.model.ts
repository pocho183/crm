export class CrmError {
	code: string;
	context: string;
	message: string;
	
	public setNoResponse() {
		this.code = '9999';
		this.context = 'Errore di rete';
		this.message = 'Impossibile connettersi al servizio.';
	}
}