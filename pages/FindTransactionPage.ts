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

	readonly transactionResultHeader: Locator = this.page.getByRole('heading', {
		name: 'Transaction Results',
	});

	readonly fundTransferTransaction: Locator = this.page
		.getByRole('cell', { name: 'Funds Transfer Sent' })
		.first();

	readonly billPaymentTransaction: Locator = this.page
		.locator('td', { hasText: 'Bill Payment to ' })
		.first();

	readonly transactionId: Locator = this.page
		.locator('td:right-of(:text("Transaction ID"))')
		.first();

	readonly dateOfTransaction: Locator = this.page
		.locator('td:right-of(:text("Date"))')
		.first();

	readonly description: Locator = this.page
		.locator('td:right-of(:text("Description"))')
		.first();

	readonly transactionType: Locator = this.page
		.locator('td:right-of(:text("Type"))')
		.first();

	readonly transactionAmount: Locator = this.page
		.locator('td:right-of(:text("Amount"))')
		.first();
}
