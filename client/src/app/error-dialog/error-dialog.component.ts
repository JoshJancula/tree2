import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-error-dialog',
	template: `<p>{{ data }}</p>`,
	styleUrls: []
})
export class ErrorDialogComponent {

	constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
