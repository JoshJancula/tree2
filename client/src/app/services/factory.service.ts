import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

const LOCAL_URL = 'http://localhost:8080';
const SERVER_URL = ``;

@Injectable({
	providedIn: 'root'
})

export class FactoryService {

	private socket: any;

	constructor(private dialog: MatDialog) { }

	public showError(message: string) {
		this.dialog.open(ErrorDialogComponent, {
			data: message,
			panelClass: 'formDialog'
		});
	}

	public initSocket(): void {
		if (window.location.host === 'localhost:4200') {
			this.socket = socketIo(LOCAL_URL);
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

	public newFactory(data: any) {
		if (this.socket === undefined) {
			this.initSocket();
		}
		this.socket.emit('newFactory', data);
	}

	public updateFactory(data: any) {
		if (this.socket === undefined) {
			this.initSocket();
		}
		this.socket.emit('updateFactory', data);
	}

	public deleteFactory(data: any) {
		if (this.socket === undefined) {
			this.initSocket();
		}
		this.socket.emit('deleteFactory', data);
	}

	public getNumbers(low: number, high: number, generate: number): string {
		let temp = [];
		for (let i = 0; i < generate; i++) {
			let number = Math.floor(Math.random() * (high - low) + 1) + low;
			temp.push(number);
		}
		return temp.toString();
	}

	public checkForm(fac: any): boolean {
		console.log('fac: ', fac);
		let formValid = true;
		if (!fac.Name || !fac.Low || !fac.High || !fac.Expires) {
			this.showError(`Please complete the form`);
			formValid = false;
		} else if (parseInt(fac.Low) > parseInt(fac.High)) {
			this.showError(`The Low number cannot be greater than the high number`);
			formValid = false;
		}
		return formValid;
	}


}
