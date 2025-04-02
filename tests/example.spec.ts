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
});

test('User Login', async () => {
	overviewPage = await homePage.loginToApplication();

	expect(await overviewPage.showsNameOnSuccess.innerText()).toContain(
		`Welcome`
	);
});
