import { Component, ViewChild, Inject } from '@angular/core';
import { TreeComponent } from './tree/tree.component';
import { UtilService } from './services/util.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	@ViewChild('treeComponent') treeComponent: TreeComponent;
	public title = 'app';

	constructor(private utilService: UtilService) {}

	public newFactory(): void {
		this.utilService.openFactoryForm(true, true);
	}

}
