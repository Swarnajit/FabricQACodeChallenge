import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OverviewPage extends BasePage {
	readonly showsNameOnSuccess = this.page.locator("//p[@class='smallText']");

	readonly openNewAccountLink: Locator = this.page.getByRole('link', {
		name: 'Open New Account',
	});

	readonly accountsOverviewLink: Locator = this.page.getByRole('link', {
		name: 'Accounts Overview',
	});

	readonly transferFundsLink: Locator = this.page.getByRole('link', {
		name: 'Transfer Funds',
	});

	readonly billPayLink: Locator = this.page.getByRole('link', {
		name: 'Bill Pay',
	});

	readonly findTransactionsLink: Locator = this.page.getByRole('link', {
		name: 'Find Transactions',
	});

	readonly logOutLink: Locator = this.page.getByRole('link', {
		name: 'Log Out',
	});

	readonly openNewAccountButton: Locator = this.page.getByRole('button', {
		name: 'Open New Account',
	});

	readonly accountOpenedHeading: Locator = this.page.getByRole('heading', {
		name: 'Account Opened!',
	});
}
