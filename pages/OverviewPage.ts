import { Locator, Page } from '@playwright/test';
import { RegisterPage } from './RegisterPage';
import { BasePage } from './BasePage';

export class OverviewPage extends BasePage {
	readonly showsNameOnSuccess = this.page.locator("//p[@class='smallText']");

	readonly gettingStartedHeader: Locator;
	readonly pomLink: Locator;
	readonly tocList: Locator;
}
