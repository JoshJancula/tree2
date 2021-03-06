import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import * as moment from 'moment';

const LOCAL_URL = 'http://localhost:8080';
const SERVER_URL = `https://josh-tree.herokuapp.com`;

@Injectable({
	providedIn: 'root'
})

export class FactoryService {

	private socket: any;
	public factoryStore = [];

	constructor(private dialog: MatDialog) { }

	public showError(message: string): void {
		this.dialog.open(ErrorDialogComponent, {
			data: message,
			panelClass: 'formDialog'
		});
	}

	public initSocket(): void {
		if (window.location.host === 'localhost:4200') {
			this.socket = socketIo(LOCAL_URL);
		} else if (window.location.host === 'localhost:8080') {
			this.socket = socketIo('http://localhost:8080');
		} else {
			this.socket = socketIo(SERVER_URL);
		}
	}

	public sendConnectionRequest(): void {
		if (this.socket === undefined) {
			this.initSocket();
		}
		this.socket.emit('connectionRequest');
	}


	public onConnectionResponse(): Observable<any> {
		return new Observable<any>(observer => {
			this.socket.on('connectionInfo', (data: any) => { observer.next(data); });
		});
	}

	public onUpdate(): Observable<any> {
		return new Observable<any>(observer => {
			this.socket.on('update', (data: any) => { observer.next(data); });
		});
	}

	public newFactory(data: any): void {
		if (this.socket === undefined) {
			this.initSocket();
		}
		this.socket.emit('newFactory', data);
	}

	public updateFactory(data: any): void {
		if (this.socket === undefined) {
			this.initSocket();
		}
		this.socket.emit('updateFactory', data);
	}

	public deleteFactory(data: any): void {
		if (this.socket === undefined) {
			this.initSocket();
		}
		this.socket.emit('deleteFactory', data);
	}

	public getNumbers(low: any, high: any, generate: any): string {
		let temp = [];
		for (let i = 0; i < parseInt(generate); i++) {
			let num = Math.floor(Math.random() * (parseInt(high) - parseInt(low)) + 1) + parseInt(low);
			temp.push(num);
		}
		return temp.toString();
	}

	public checkForm(fac: any, generate?: any): boolean {
		console.log('fac: ', fac);
		let formValid = true;
		if (!fac.Name || !fac.Low || !fac.High || !fac.Expires) {
			this.showError(`Please complete the form.`);
			formValid = false;
		} else if (parseInt(fac.Low) > parseInt(fac.High)) {
			this.showError(`The Low number cannot be greater than the high number.`);
			formValid = false;
		} else if (parseInt(generate) > 15) {
			this.showError(`You cannot generate more than 15 numbers.`);
			formValid = false;
		} else if (moment(fac.Expires).isBefore(moment(new Date()))) {
			this.showError(`You cannot set a time in the past.`);
			formValid = false;
		} else if (!fac.id) {
			if (this.factoryStore.find(row => (row.Name === fac.Name))) {
				this.showError(`There is already a factory with this name.`);
				formValid = false;
			}
		}
		return formValid;
	}


}
