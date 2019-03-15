import { Component, OnInit } from '@angular/core';
import { Subscription, TimeInterval } from 'rxjs';
import { FactoryService } from '../services/factory.service';
import { UtilService } from '../services/util.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import * as moment from 'moment';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	selector: 'app-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

	public factories = [];
	private updateSubscription: Subscription;
	public allExpandState = true;
	private interval = undefined;

	constructor(private expansionPanel: MatExpansionModule, public dialog: MatDialog, private utilService: UtilService, private factoryService: FactoryService) {
	}

	ngOnInit(): void {
		this.factoryService.initSocket();
		this.factoryService.sendConnectionRequest();
		this.factoryService.onConnectionResponse().subscribe((response: any) => {
			this.setFactoryInfo(response);
		}, error => {
			this.utilService.showError(`Error sending connection request: ${error}`);
		});
		this.subscribeToUpdates();
	}

	private subscribeToUpdates(): void {
		if (this.updateSubscription) { this.updateSubscription.unsubscribe(); }
		this.updateSubscription = this.factoryService.onUpdate().subscribe((response: any) => {
			this.utilService.dialog.closeAll();
			this.handleUpdate(response);
		}, error => {
			this.utilService.showError(`Error in update listener ${error}`);
		});
	}

	private handleUpdate(res): void {
		switch (res.Action) {
			case 'new': this.newFactory(res.Value); break;
			case 'updated': this.factoryUpdated(res.Value); break;
			case 'deleted': this.factoryDeleted(res.Value); break;
		}
	}

	private newFactory(fac): void {
		fac.Numbers = JSON.parse('[' + fac.Numbers + ']');
		this.factories.push(fac);
		this.checkExpiration();
		this.factoryService.factoryStore = this.factories;
	}

	private factoryUpdated(value: any): void {
		this.factories.find(row => row.id === value.id).Name = value.Name;
		this.factories.find(row => row.id === value.id).Low = value.Low;
		this.factories.find(row => row.id === value.id).High = value.High;
		this.factories.find(row => row.id === value.id).Expires = value.Expires;
		this.factories.find(row => row.id === value.id).Numbers = JSON.parse('[' + value.Numbers + ']');
		this.checkExpiration();
		this.factoryService.factoryStore = this.factories;
	}

	private factoryDeleted(value: any): void {
		this.factories.splice(this.factories.indexOf(value), 1);
		this.factoryService.factoryStore = this.factories;
	}

	private setFactoryInfo(facs: any): void {
		let temp = [];
		facs.forEach(fac => {
			fac.Numbers = JSON.parse('[' + fac.Numbers + ']');
			temp.push(fac);
		});
		this.factories = temp;
		this.factoryService.factoryStore = temp;
		this.interval = setInterval(() => this.checkExpiration(), 10000);
	}

	public editFactory(fac: any): void {
		this.utilService.openFactoryForm(false, false, fac);
		this.checkExpiration();
	}

	public deleteFactory(fac: any): void {
		this.openConfirmDialog(fac);
		this.checkExpiration();
	}

	public newNumbers(fac: any): void {
		console.log('fac passed to newNumbers: ', fac);
		this.utilService.openFactoryForm(false, true, fac);
	}

	public openConfirmDialog(fac: any): void {
		const newDialog = this.dialog.open(ConfirmDialogComponent, {
			data: '',
			panelClass: 'formDialog'
		});
		newDialog.beforeClose().subscribe(result => {
			const res = newDialog.componentInstance.result;
			if (res === true) { this.factoryService.deleteFactory(fac); }
		});
	}

	private checkExpiration(): void {
		this.factories.forEach(fac => {
			if (moment(new Date()).isSameOrAfter(moment(fac.Expires))) {
				fac.Numbers = [];
				const tempDate = new Date();
				let tempMIN = moment(tempDate).format('HH:mm');
				fac.Expires = tempDate.toString().replace(tempMIN, '23:59');
				this.factoryService.updateFactory(fac);
			}
		});
	}


}
