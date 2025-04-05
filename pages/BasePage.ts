import { Locator, Page } from '@playwright/test';

export class BasePage {
	private _page: Page;

	constructor(page: Page) {
		this._page = page;
	}

	get page(): Page {
		if (!this._page) throw new Error('Page object has not been initialized');

		return this._page;
	}

	TIMEOUT_01_SECOND: number = 1000;
	TIMEOUT_10_SECOND: number = 1000;
}
