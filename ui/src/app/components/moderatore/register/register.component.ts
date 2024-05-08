import { Component, OnInit } from '@angular/core';
import { StubTreatment } from "../../../models/stubtreatment";



@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class ModeratoreRegisterComponent implements OnInit {
	
	numberRegister: string[]=[ "1", "2", "3"];
	topicRegister: string[]=[ "Anagrafica responsabile", "Anagrafica cliente", "Misure organizzative"];
	
	//treatment: string[] = ["1"];
	treatment: StubTreatment[] = [{
		columns: [
			{ names: ["Numero trattamento", "Data inizio trattamento", "Numero contratto per il trattameto", "Nome del titolare del trattamento", "Nome del contitolare del trattamento", "Nome del rappresentante (UE) del titolare del trattamento", "Nome del responsabile della protezione dei dati Nominato", "Finalità del trattamento"] },
			{ names: ["Categorie di interessati dal trattamento", "Categorie di dati personali trattati da FDM", "CATEGORIA DI DESTINATARI NELLA (UE) DELLA COMUNICAZIONE DEI DATI TRATTATI", "CATEGORIA DI DESTINATARI EXTRA (UE) DELLA COMUNICAZIONE DEI DATI TRATTATI", "PAESE TERZO IN CUI RISIEDONO DESTINATARI DEI DATI", "DESTINATARI DI PAESI TERZI O ORG. INTERNAZIONALI", "TEMPO MASSIMO DI TRATTAMENTO (Cancellazione / Restituzione)"] },
			{ names: ["MOTIVO DI CESSAZIONE DEL TRATTAMENTO", "MODALITA' DI CESSAZIONE DEL TRATTAMENTO", "SEDE AZIENDALE  DEL TRATTAMENTO", "FUNZIONE AZIEDNALE  INCARICATA DEL TRATTAMENTO", "MISURE DI SICUREZZA FISICA", "MISURE DI SICUREZZA LOGICA"] }
		],
		rows: [
			{ names: ["1", "Data inizio Contratto dei servizi: Inizio 2012 e rinnovi successivi", "Contratto di servizi", "Mercedes Benz Financial Services Italia Spa", "N.A", "Mercedes Benz Financial Services Italia Spa", "Severino Cirimelli", "Conservazione documentali in Outsourcing"] },
			{ names: ["Clienti, Dipendenti del Titolare, altri soggetti in relazione con il Titolare", "Dati Identificativi Clienti del Titolare; Dati Particolari dei Clienti del Titolare (Agevolazioni fiscali all'acquisto); Dati Identificativi Dipendenti del Titolare; Dati Particolari Dipendenti del Titolare; Dati di geolocalizzazione; Dati Finanziari; Dati Giudiziari (Recupero Crediti); Dati identificativi dei Partner del Titolare", "Nessuno", "Nessuno", "N.A", "N.A", "Durata del contratto principale di servizio"] },
			{ names: ["N.A", "N.A", "Restituzione al titolare e Cancellazione sicura dei data base", "MILANO - Valtorta, n. 47; MORTARA via XI Settembre snc; CITTA' DELLA PIEVE via vocabolo, 1;APRILIA via Delle Valli snc", "AREA LAVORAZIONI; AREA ARCHIVIO; SERIZIO NAVETTA; SERVIZIO CLIENTI", "Controllo Accessi;Presidio Ingresso sede; Sistema Antintrusione; Servizio di Vigilanza Privata; Impianto di TVCC; Sistema Antincendio"] }
		]
	}];
	
	constructor() {}

	ngOnInit(): void {
		console.log(this.treatment);
	}
}