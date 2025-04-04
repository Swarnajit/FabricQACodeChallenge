import { Page } from '@playwright/test';

export class BasePage {
	private _page: Page;

	constructor(page: Page) {
		this._page = page;
	}

	get page(): Page {
		if (!this._page) throw new Error('Page object has not been initialized');

		return this._page;
	}

	static readonly TIMEOUT_SECOND_1: 1000;
}
