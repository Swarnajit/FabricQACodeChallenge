import { expect, Locator, Page } from '@playwright/test';
import { RegisterPage } from './RegisterPage';
import { BasePage } from './BasePage';
import { OverviewPage } from './OverviewPage';
import { Credentials } from '../playwright.config';

export class HomePage extends BasePage {
	readonly registerLink: Locator = this.page.getByRole('link', {
		name: 'Register',
	});

	readonly userName: Locator = this.page.locator('input[name="username"]');
	readonly password: Locator = this.page.locator('input[name="password"]');
	readonly loginButton: Locator = this.page.getByRole('button', {
		name: 'Log In',
	});

	async gotoHomePage(): Promise<HomePage> {
		await this.page.goto(Credentials.CONFIG_URL);
		return Promise.resolve(new HomePage(this.page));
	}

	async openRegisterPage(): Promise<RegisterPage> {
		await this.registerLink.click();
		return Promise.resolve(new RegisterPage(this.page));
	}

	async loginToApplication(): Promise<OverviewPage> {
		await this.userName.fill('user799189801');
		await this.password.fill('9775user7991');
		await this.loginButton.click();
		return Promise.resolve(new OverviewPage(this.page));
	}
}
