import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Utility } from '../utility/Utility';

export class RegisterPage extends BasePage {
	readonly registerPageHeader: Locator = this.page.getByRole('heading', {
		name: 'Signing up is easy!',
	});

	readonly firstNameLocator: Locator = this.page.locator(
		'[id="customer\\.firstName"]'
	);

	readonly lastName: Locator = this.page.locator('[id="customer\\.lastName"]');
	readonly address: Locator = this.page.locator(
		'[id="customer\\.address\\.street"]'
	);
	readonly city: Locator = this.page.locator(
		'[id="customer\\.address\\.city"]'
	);
	readonly state: Locator = this.page.locator(
		'[id="customer\\.address\\.state"]'
	);
	readonly zipCode: Locator = this.page.locator(
		'[id="customer\\.address\\.zipCode"]'
	);
	readonly phoneNumber: Locator = this.page.locator(
		'[id="customer\\.phoneNumber"]'
	);
	readonly socialSecurity: Locator = this.page.locator('[id="customer\\.ssn"]');
	readonly userNameLocator: Locator = this.page.locator(
		'[id="customer\\.username"]'
	);
	readonly passwordLocator: Locator = this.page.locator(
		'[id="customer\\.password"]'
	);

	readonly confirmPassword: Locator = this.page.locator('#repeatedPassword');

	readonly registerButton: Locator = this.page.getByRole('button', {
		name: 'Register',
	});

	readonly logOutLink: Locator = this.page.getByRole('link', {
		name: 'Log Out',
	});

	readonly randomNum: number = this.generateRandomNumber(1000, 9999);
	readonly firstName: string = this.generateFirstName(this.randomNum);
	readonly userName: string = this.generateUserName(this.firstName);
	readonly password: string = this.generatePassword(this.firstName);

	readonly welcomeMessage = this.page.locator("//div[@id='rightPanel']");

	constructor(page: Page) {
		super(page);
		Utility.writeJsonData(this.userName, this.password);
	}

	async inputUserDetails(): Promise<void> {
		await this.firstNameLocator.fill(this.firstName);
		await this.lastName.fill(Utility.getValue('lastName'));
		await this.address.fill(Utility.getValue('streetName'));
		await this.city.fill(Utility.getValue('city'));
		await this.state.fill(Utility.getValue('state'));
		await this.zipCode.fill(Utility.getValue('zipCode'));
		await this.phoneNumber.fill(Utility.getValue('phoneNumber1'));
		await this.socialSecurity.fill(this.firstName);
		await this.userNameLocator.fill(this.userName);
	}

	async inputPassword(passwordDetails: string, confirmPassword: string) {
		await this.passwordLocator.fill(passwordDetails);
		await this.confirmPassword.fill(confirmPassword);
	}

	private generateFirstName(newNumber: number): string {
		return `${Utility.getValue('firstName')}${newNumber}`;
	}

	private generateUserName(firstName: string): string {
		const currentDateTime = Math.floor(1000 + Math.random() * 9000);
		return `${firstName}${currentDateTime}1`;
	}

	private generatePassword(firstName: string): string {
		const currentDateTime = Math.floor(1000 + Math.random() * 9000); //Date.now();
		return `${currentDateTime}${firstName}`;
	}

	private generateRandomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
