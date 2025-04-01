import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/Homepage';
import { Credentials } from '../playwright.config';
import { BasePage } from '../pages/BasePage';

let basePage: BasePage;
let homePage: HomePage;
let registerPage: RegisterPage;
let page:Page;

test.beforeAll(async ({browser})=>{

  page= await browser.newPage();

  homePage = await new HomePage(page).gotoHomePage();

});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("First test", async()=>{

  registerPage = await homePage.openRegisterPage();

  await registerPage.firstName.fill("Swarnajit");
});
