import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
	readonly firstName: Locator = this.page.locator(
		'[id="customer\\.firstName"]'
	);
	readonly lastName: Locator = this.page.locator('[id="customer\\.lastName"]');
	readonly addressStreet: Locator = this.page.locator(
		'[id="customer\\.address\\.street"]'
	);
	readonly addressCity: Locator = this.page.locator(
		'[id="customer\\.address\\.city"]'
	);
	readonly addressState: Locator = this.page.locator(
		'[id="customer\\.address\\.state"]'
	);
	readonly zipCode: Locator = this.page.locator(
		'[id="customer\\.address\\.zipCode"]'
	);
	readonly phoneNumber: Locator = this.page.locator(
		'[id="customer\\.phoneNumber"]'
	);
	readonly socialSecurity: Locator = this.page.locator('[id="customer\\.ssn"]');
	readonly userName: Locator = this.page.locator('[id="customer\\.username"]');
	readonly password: Locator = this.page.locator('[id="customer\\.password"]');
	readonly confirmPassword: Locator = this.page.locator('#repeatedPassword');
	readonly registerButton: Locator = this.page.getByRole('button', {
		name: 'Register',
	});

	readonly welcomeMessage = this.page.locator("//div[@id='rightPanel']");

	async createUser(): Promise<void> {
		const randomNum: number = this.generateRandomNumber(1000, 9999);
		const firstName: string = this.generateFirstName(randomNum);
		const password: string = this.generatePassword(firstName);
		const userName: string = this.generateUserName(firstName);
		const lastName: string = 'Sample';

		await this.firstName.fill(firstName);
		await this.lastName.fill(lastName);
		await this.addressStreet.fill('Baker Street');
		await this.addressCity.fill('London');
		await this.addressState.fill('India');
		await this.zipCode.fill(randomNum.toString());
		await this.phoneNumber.fill(this.generatePhoneNumber());
		await this.socialSecurity.fill(firstName);
		await this.userName.fill(userName);
		await this.password.fill(password);
		await this.confirmPassword.fill(password);
		await this.registerButton.click();

		// expect(await this.showsNameOnSuccess.innerText()).toEqual(
		// 	`Welcome ${firstName} ${lastName}`
		// );

		expect(await this.welcomeMessage.innerText()).toContain(
			`Welcome ${userName}`
		);

		expect(await this.welcomeMessage.innerText()).toContain(
			'Your account was created'
		);

		// console.log(await this.welcomeMessage.innerText());

		// console.log(password);
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
