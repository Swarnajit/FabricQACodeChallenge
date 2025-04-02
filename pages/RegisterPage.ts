import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Utility } from '../utility/Utility';

export class RegisterPage extends BasePage {
	readonly firstNameLocator: Locator = this.page.locator(
		'[id="customer\\.firstName"]'
	);
	readonly lastNameLocator: Locator = this.page.locator(
		'[id="customer\\.lastName"]'
	);
	readonly addressStreetLocator: Locator = this.page.locator(
		'[id="customer\\.address\\.street"]'
	);
	readonly addressCityLocator: Locator = this.page.locator(
		'[id="customer\\.address\\.city"]'
	);
	readonly addressStateLocator: Locator = this.page.locator(
		'[id="customer\\.address\\.state"]'
	);
	readonly zipCodeLocator: Locator = this.page.locator(
		'[id="customer\\.address\\.zipCode"]'
	);
	readonly phoneNumberLocator: Locator = this.page.locator(
		'[id="customer\\.phoneNumber"]'
	);
	readonly socialSecurityLocator: Locator = this.page.locator(
		'[id="customer\\.ssn"]'
	);
	readonly userNameLocator: Locator = this.page.locator(
		'[id="customer\\.username"]'
	);
	readonly passwordLocator: Locator = this.page.locator(
		'[id="customer\\.password"]'
	);
	readonly confirmPasswordLocator: Locator =
		this.page.locator('#repeatedPassword');
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

	async createUser(): Promise<void> {
		const lastName: string = 'Sample';

		await this.firstNameLocator.fill(this.firstName);
		await this.lastNameLocator.fill(lastName);
		await this.addressStreetLocator.fill('Baker Street');
		await this.addressCityLocator.fill('London');
		await this.addressStateLocator.fill('India');
		await this.zipCodeLocator.fill(this.randomNum.toString());
		await this.phoneNumberLocator.fill(this.generatePhoneNumber());
		await this.socialSecurityLocator.fill(this.firstName);
		await this.userNameLocator.fill(this.userName);
		await this.passwordLocator.fill(this.password);
		await this.confirmPasswordLocator.fill(this.password);
		await this.registerButton.click();

		// expect(await this.showsNameOnSuccess.innerText()).toEqual(
		// 	`Welcome ${firstName} ${lastName}`
		// );

		expect(await this.welcomeMessage.innerText()).toContain(
			`Welcome ${this.userName}`
		);

		expect(await this.welcomeMessage.innerText()).toContain(
			'Your account was created'
		);
	}

	private generateFirstName(newNumber: number): string {
		return `user${newNumber}`;
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
		// return Math.floor(1000 + Math.random() * 9000);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	private generatePhoneNumber(): string {
		return Math.floor(Math.random() * 1000000000).toString();
	}
}
