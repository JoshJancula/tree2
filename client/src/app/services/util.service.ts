import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { FactoryFormComponent } from '../factory-form/factory-form.component';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class UtilService {

	constructor(public dialog: MatDialog) {
	}

	public openFactoryForm(newFac: boolean, newNumbers: boolean, factory?: object): void {
		const dataToPass = { Factory: factory ? factory : undefined, New: newFac, Numbers: newNumbers };
		this.dialog.open(FactoryFormComponent, {
			data: dataToPass,
			panelClass: 'formDialog'
		});
	}

	public openConfirmDialog(): void {
		const newDialog = this.dialog.open(ConfirmDialogComponent, {
			data: '',
			panelClass: 'formDialog'
		});
		newDialog.beforeClose().subscribe(result => {
			const res = newDialog.componentInstance.result;
		});
	}

	public showError(message: string) {
		this.dialog.open(ErrorDialogComponent, {
			data: message,
			panelClass: 'formDialog'
		});
	}

	public getDiff(a: any, b: any, total: any) {
		let diff;
		if (b !== null && b !== '' && b !== undefined) {
			let x = moment(a);
			let y = moment(b);
			diff = moment.duration(x.diff(y));
		} else {
			let x = moment(a);
			let y = moment(new Date);
			diff = moment.duration(x.diff(y));
		}
		if (total) {
			return diff._milliseconds.toString().replace('-', '');
		} else {
			let tempTime = moment.duration(diff._milliseconds);
			if (tempTime.hours() < 0) {
				return `${tempTime.hours().toString().replace('-', '')} hr ${tempTime.minutes().toString().replace('-', '')} minutes`;
			} else {
				const test = tempTime.asSeconds();
				return `${tempTime.minutes().toString().replace('-', '')} minutes`;
			}
		}
	}

}
