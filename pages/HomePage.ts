import { Locator } from '@playwright/test';
import { RegisterPage } from './RegisterPage';
import { BasePage } from './BasePage';
import { OverviewPage } from './OverviewPage';
import { Credentials } from '../playwright.config';
import { Utility } from '../utility/Utility';

export class HomePage extends BasePage {
	readonly registerLink: Locator = this.page.getByRole('link', {
		name: 'Register',
	});

	readonly userName: Locator = this.page.locator('input[name="username"]');
	readonly password: Locator = this.page.locator('input[name="password"]');
	readonly loginButton: Locator = this.page.getByRole('button', {
		name: 'Log In',
	});

	readonly errorHeader: Locator = this.page.getByRole('heading', {
		name: 'Error!',
	});

	async gotoHomePage(): Promise<HomePage> {
		await this.page.goto(Credentials.CONFIG_URL);
		return Promise.resolve(new HomePage(this.page));
	}

	async openRegisterPage(): Promise<RegisterPage> {
		await this.registerLink.click();
		return Promise.resolve(new RegisterPage(this.page));
	}

	async tryUnsuccessfulLogin(
		nameOfUser: string,
		passwordDetails: string
	): Promise<void> {
		await this.userName.fill(nameOfUser);
		await this.password.fill(passwordDetails);
		await this.loginButton.click();
		return Promise.resolve();
	}

	async loginToApplication(): Promise<OverviewPage> {
		await this.userName.fill(Utility.getValue('userName'));
		await this.password.fill(Utility.getValue('password'));
		await this.loginButton.click();
		return Promise.resolve(new OverviewPage(this.page));
	}
}
