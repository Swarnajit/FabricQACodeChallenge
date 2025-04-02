import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { BasePage } from '../pages/BasePage';

let basePage: BasePage;
let homePage: HomePage;
let registerPage: RegisterPage;
let page:Page;

test.beforeAll(async ({browser})=>{

  page= await browser.newPage();

  homePage = await new HomePage(page).gotoHomePage();

});

test("Register a user", async()=>{

  registerPage = await homePage.openRegisterPage();

  await registerPage.createUser();
});
