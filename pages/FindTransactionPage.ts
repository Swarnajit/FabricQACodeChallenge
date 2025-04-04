import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FindTransactionPage extends BasePage {
	readonly findTransactionHeader: Locator = this.page.locator(
		"//h1[normalize-space()='Find Transactions']"
	);

	readonly selectAccount: Locator = this.page.locator(
		"	//select[@id='accountId']"
	);

	readonly enterAmount: Locator = this.page.locator("//input[@id='amount']");

	readonly findByAmountButton: Locator = this.page.locator('#findByAmount');

	readonly transactionResultHeader = this.page.getByRole('heading', {
		name: 'Transaction Results',
	});

	readonly fundTransferTransaction = this.page
		.getByRole('cell', { name: 'Funds Transfer Sent' })
		.first();

	readonly billPaymentTransaction = this.page
		.locator('td', { hasText: 'Bill Payment to ' })
		.first();

	readonly transactionId = this.page
		.locator('td:right-of(:text("Transaction ID"))')
		.first();
}
