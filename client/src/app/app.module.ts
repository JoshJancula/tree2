import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { FactoryFormComponent } from './factory-form/factory-form.component';
import { MatCardModule, MatSlideToggleModule, MatSliderModule, MatRadioModule, MatAutocompleteModule } from '@angular/material';
import { MatSidenavModule, MatButtonModule, MatListModule, MatGridListModule, MatSnackBarModule } from '@angular/material';
import { MatMenuModule, MatToolbarModule, MatPaginatorModule, MatCheckboxModule } from '@angular/material';
import { MatNativeDateModule, MatSortModule, MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDialogModule, MatExpansionModule, MatIconModule, MatChipsModule, MatDatepickerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
	entryComponents: [
		FactoryFormComponent,
		ConfirmDialogComponent,
		ErrorDialogComponent
	],
	declarations: [
		AppComponent,
		TreeComponent,
		FactoryFormComponent,
		ConfirmDialogComponent,
		ErrorDialogComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		MatCardModule,
		MatSlideToggleModule,
		MatSliderModule,
		MatRadioModule,
		MatAutocompleteModule,
		MatSidenavModule,
		MatButtonModule,
		MatListModule,
		MatGridListModule,
		MatGridListModule,
		MatSnackBarModule,
		MatMenuModule,
		MatToolbarModule,
		MatPaginatorModule,
		MatCheckboxModule,
		MatNativeDateModule,
		MatSortModule,
		MatSelectModule,
		MatFormFieldModule,
		MatInputModule,
		MatExpansionModule,
		MatIconModule,
		MatChipsModule,
		MatDatepickerModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatSlideToggleModule,
		MatSliderModule,
		MatButtonModule,
		MatDialogModule,
		MatExpansionModule,
		MatToolbarModule,
		MatSidenavModule,
		MatSelectModule,
		MatMenuModule,
		MatSortModule,
		MatPaginatorModule,
		MatCheckboxModule,
		MatRadioModule,
		MatListModule,
		MatGridListModule,
		MatSnackBarModule,
		MatChipsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatIconModule,
		MatAutocompleteModule,
		BrowserAnimationsModule,
		HttpClientModule,
		HttpModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
