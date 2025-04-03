import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TransferFundPage } from './TransferFundPage';
import { FindTransactionPage } from './FindTransactionPage';

export class OverviewPage extends BasePage {
	readonly showsNameOnSuccess = this.page.locator("//p[@class='smallText']");
	readonly overViewHeading = this.page.locator(
		"//h1[normalize-space()='Accounts Overview']"
	);

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

	readonly typeOfAccount: Locator = this.page.locator('#type');

	async gotoTransferPage(): Promise<TransferFundPage> {
		await this.transferFundsLink.click();
		return Promise.resolve(new TransferFundPage(this.page));
	}

	async gotoFindTransactionPage(): Promise<FindTransactionPage> {
		await this.findTransactionsLink.click();
		return Promise.resolve(new FindTransactionPage(this.page));
	}
}
