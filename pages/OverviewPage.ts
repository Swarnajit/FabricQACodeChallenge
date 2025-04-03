import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TransferFundPage } from './TransferFundPage';
import { FindTransactionPage } from './FindTransactionPage';

export class OverviewPage extends BasePage {
	readonly showsNameOnSuccess: Locator = this.page.locator(
		"//p[@class='smallText']"
	);
	readonly overViewHeading: Locator = this.page.locator(
		"//h1[normalize-space()='Accounts Overview']"
	);

	readonly accountNum = this.page.locator('td:near(:text("Account"))').first();

	readonly accountBalance = this.page
		.locator('td:below(:text("Balance"))')
		.first();

	readonly availableAmount = this.page
		.locator('td:near(:text("Available Amount"))')
		.first();

	readonly openNewAccountLink: Locator = this.page.getByRole('link', {
		name: 'Open New Account',
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
