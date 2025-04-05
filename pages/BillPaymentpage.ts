import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Utility } from '../utility/Utility';

export class BillPaymentpage extends BasePage {
	readonly payeeName: Locator = this.page.locator('input[name="payee\\.name"]');
	readonly streetName: Locator = this.page.locator(
		'input[name="payee\\.address\\.street"]'
	);
	readonly city: Locator = this.page.locator(
		'input[name="payee\\.address\\.city"]'
	);
	readonly state: Locator = this.page.locator(
		'input[name="payee\\.address\\.state"]'
	);
	readonly zipCode: Locator = this.page.locator(
		'input[name="payee\\.address\\.zipCode"]'
	);
	readonly phoneNumber: Locator = this.page.locator(
		'input[name="payee\\.phoneNumber"]'
	);
	readonly accountNumber: Locator = this.page.locator(
		'input[name="payee\\.accountNumber"]'
	);
	readonly verifyAccount: Locator = this.page.locator(
		'input[name="verifyAccount"]'
	);

	readonly fromAccount: Locator = this.page.getByRole('combobox');

	readonly amount: Locator = this.page.locator('input[name="amount"]');
	readonly sendPaymentButton: Locator = this.page.getByRole('button', {
		name: 'Send Payment',
	});

	readonly successfulPaymentHeader: Locator = this.page.getByRole('heading', {
		name: 'Bill Payment Complete',
	});

	async enterBillDetails(): Promise<void> {
		await this.payeeName.fill(Utility.getValue('payeeName'));
		await this.streetName.fill(Utility.getValue('streetName'));
		await this.city.fill(Utility.getValue('city'));
		await this.state.fill(Utility.getValue('state'));
		await this.zipCode.fill(Utility.getValue('zipCode'));
		await this.phoneNumber.fill(Utility.getValue('phoneNumber2'));
		await this.amount.fill(Utility.getValue('billAmount'));

		return Promise.resolve();
	}

	async enterAccountDetails(
		accountNumber: string,
		verifyAccount: string
	): Promise<void> {
		await this.accountNumber.fill(accountNumber);
		await this.verifyAccount.fill(verifyAccount);

		return Promise.resolve();
	}
}
