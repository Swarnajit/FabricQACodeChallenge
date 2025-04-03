import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { OverviewPage } from '../pages/OverviewPage';
import { TransferFundPage } from '../pages/TransferFundPage';

let homePage: HomePage;
let registerPage: RegisterPage;
let page: Page;
let overviewPage: OverviewPage;
let transferFundPage: TransferFundPage;

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

	await overviewPage.page.waitForTimeout(2000);

	await overviewPage.openNewAccountButton.waitFor({
		state: 'visible',
		timeout: 10000,
	});

	// await expect(overviewPage.accountsOverviewLink).toBeVisible();

	// await page.locator('#type').selectOption('0');
	// await page.locator('#type').selectOption('1');

	var existingAccountNum = await overviewPage.page
		.locator('#fromAccountId')
		.innerText();

	// await overviewPage.openNewAccountButton.click({ timeout: 10000 });

	const isButtonEnabled = await overviewPage.openNewAccountButton.isEnabled();
	console.log('Is the openNewAccountButton enabled:', isButtonEnabled);

	if (isButtonEnabled) {
		await overviewPage.openNewAccountButton.click({
			timeout: 10000,
			force: true,
		});
	} else {
		console.error('The openNewAccountButton is not enabled.');
	}

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
