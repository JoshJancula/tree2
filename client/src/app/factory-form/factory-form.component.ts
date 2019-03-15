import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { FactoryService } from '../services/factory.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-factory-form',
	templateUrl: './factory-form.component.html',
	styleUrls: ['./factory-form.component.scss']
})
export class FactoryFormComponent implements OnInit {

	public factory = {
		Name: '',
		High: 10,
		Low: 1,
		Numbers: '',
		Expires: '23:59'
	};

	public generate = 15;
	public minTime = moment(new Date()).format('HH:mm');

	constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<FactoryFormComponent>, private factoryService: FactoryService, @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
		if (this.data.Factory !== undefined) {
			this.factory = this.data.Factory;
			this.factory.Expires = moment(this.factory.Expires).format('HH:mm');
		}
	}

	public saveFactory(): void {
		this.factory.Expires = this.setTime(this.factory.Expires);
		if (this.factoryService.checkForm(this.factory, this.generate)) {
			if (this.data.New === true) {
				this.factory.Numbers = this.factoryService.getNumbers(this.factory.Low, this.factory.High, this.generate);
				this.factoryService.newFactory(this.factory);
			} else if (this.data.Numbers === true) {
				this.factory.Numbers = this.factoryService.getNumbers(this.factory.Low, this.factory.High, this.generate);
				this.factoryService.updateFactory(this.factory);
			} else {
				this.factoryService.updateFactory(this.factory);
			}
			this.dialog.closeAll();
		} else { this.factory.Expires = moment(this.factory.Expires).format('HH:mm'); }
	}

	private setTime(time: any): string {
		const tempDate = new Date();
		let tempMIN = moment(tempDate).format('HH:mm');
		const newTime = tempDate.toString().replace(tempMIN, time);
		return newTime;
	}

	public numberOnly(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;

	}

}
