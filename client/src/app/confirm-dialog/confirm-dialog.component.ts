import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-confirm-dialog',
	template: `<div class='row' style='width: 100%'>Are you sure? This cannot be undone.<button (click)='userClick(true);' mat-button>Yes</button><br><button (click)='userClick(false);' mat-button>No</button></div>`,
	styleUrls: []
})
export class ConfirmDialogComponent {

	public result = false;

	constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

	public userClick(bool: boolean): void {
		if (bool === true) {
			this.result = true;
		} else { this.result = false; }
		this.dialogRef.close();
	}

}
