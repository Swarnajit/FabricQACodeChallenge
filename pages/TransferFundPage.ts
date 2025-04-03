import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundPage extends BasePage {
	readonly amountBox: Locator = this.page.locator("//input[@id='amount']");

	readonly fromAccount: Locator = this.page.locator(
		"//select[@id='fromAccountId']"
	);

	readonly toAccount: Locator = this.page.locator(
		"//select[@id='toAccountId']"
	);

	readonly transferButton: Locator = this.page.getByRole('button', {
		name: 'Transfer',
	});
}
