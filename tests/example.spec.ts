import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { OverviewPage } from '../pages/OverviewPage';
import { TransferFundPage } from '../pages/TransferFundPage';
import { FindTransactionPage } from '../pages/FindTransactionPage';

let homePage: HomePage;
let registerPage: RegisterPage;
let page: Page;
let overviewPage: OverviewPage;
let transferFundPage: TransferFundPage;
let findTransactionPage: FindTransactionPage;

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();

	homePage = await new HomePage(page).gotoHomePage();
});

test.skip('Register a user', async () => {
	registerPage = await homePage.openRegisterPage();

	await registerPage.createUser();

	await registerPage.logOutLink.click();

	await expect(registerPage.firstNameLocator).not.toBeVisible();
});

test('User Login', async () => {
	overviewPage = await homePage.loginToApplication();

	expect(await overviewPage.showsNameOnSuccess.innerText()).toContain(
		`Welcome`
	);
});

test.skip('Get Account number', async () => {
	await overviewPage.openNewAccountLink.click();

	await overviewPage.openNewAccountButton.waitFor();

	var existingAccountNum = '';

	while (!existingAccountNum) {
		existingAccountNum = await overviewPage.page
			.locator('#fromAccountId')
			.innerText();

		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	await overviewPage.typeOfAccount.selectOption('1');

	await overviewPage.openNewAccountButton.click({ timeout: 10000 });

	await expect(overviewPage.accountOpenedHeading).toBeVisible();

	var addedAccountNum = await overviewPage.page
		.locator("//a[@id='newAccountId']")
		.innerText();

	transferFundPage = await overviewPage.gotoTransferPage();

	await expect(transferFundPage.amountBox).toBeVisible();

	await transferFundPage.amountBox.fill('100');

	await transferFundPage.fromAccount.selectOption(existingAccountNum);

	await transferFundPage.toAccount.selectOption(addedAccountNum);

	await transferFundPage.transferButton.click();
});

test.skip('Find Transaction', async () => {
	findTransactionPage = await overviewPage.gotoFindTransactionPage();

	await expect(findTransactionPage.findTransactionHeader).toBeVisible();

	await findTransactionPage.enterAmount.fill('100');

	await findTransactionPage.findByAmountButton.click();
});
