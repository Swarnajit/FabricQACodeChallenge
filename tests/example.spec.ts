import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { BasePage } from '../pages/BasePage';
import { OverviewPage } from '../pages/OverviewPage';

let homePage: HomePage;
let registerPage: RegisterPage;
let page: Page;
let overviewPage: OverviewPage;

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
		`Welcome`
	);
});

test('Get Account number', async () => {
	await overviewPage.openNewAccountLink.click();

	// await expect(overviewPage.accountsOverviewLink).toBeVisible();

	// await page.locator('#type').selectOption('0');
	// await page.locator('#type').selectOption('1');

	var accountNum = overviewPage.page.locator('#fromAccountId').innerText();

	await overviewPage.openNewAccountButton.click();

	expect(overviewPage.accountOpenedHeading).toBeVisible();

	expect(
		overviewPage.page.getByText(`Your new account number:${accountNum}`)
	).toBeVisible();
});
