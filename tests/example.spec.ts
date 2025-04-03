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

var fromAccountNum: string = '';
var existingAccountNum: string = '';

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();

	homePage = await new HomePage(page).gotoHomePage();
});

test('Register a user', async () => {
	registerPage = await homePage.openRegisterPage();

	await registerPage.createUser();

	await registerPage.logOutLink.click();

	await expect(registerPage.firstNameLocator).not.toBeVisible();
});

test('User Login', async () => {
	overviewPage = await homePage.loginToApplication();

	expect(await overviewPage.showsNameOnSuccess.innerText()).toContain(
		'Welcome'
	);

	const regex = /^[0-9]+$/;

	while (!existingAccountNum || !regex.test(existingAccountNum)) {
		existingAccountNum = await overviewPage.accountNum.innerText();

		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	expect(await overviewPage.accountBalance.innerText()).toContain('500');

	expect(await overviewPage.availableAmount.innerText()).toContain('500');
});

test('Get Account number', async () => {
	await overviewPage.openNewAccountLink.click();

	await overviewPage.openNewAccountButton.waitFor();

	while (!fromAccountNum) {
		fromAccountNum = await overviewPage.page
			.locator('#fromAccountId')
			.innerText();

		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	expect(fromAccountNum).toEqual(existingAccountNum);

	await overviewPage.typeOfAccount.selectOption('1');

	await overviewPage.openNewAccountButton.click({ timeout: 10000 });

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

test('Find Transaction', async () => {
	findTransactionPage = await overviewPage.gotoFindTransactionPage();

	await expect(findTransactionPage.findTransactionHeader).toBeVisible();

	await findTransactionPage.enterAmount.fill('100');

	await findTransactionPage.findByAmountButton.click();

	await expect(findTransactionPage.transactionResultHeader).toBeInViewport();

	expect(
		await findTransactionPage.firstSentTransaction.isVisible(),
		"'No transaction has been taken place'"
	).toBeTruthy();

	await findTransactionPage.firstSentTransaction.click();

	await findTransactionPage.transactionId.isVisible();

	// console.log(await findTransactionPage.transactionId.innerText());
});
