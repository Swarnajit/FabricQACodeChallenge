import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";


export class RegisterPage extends BasePage
{
    readonly firstName: Locator = this.page.locator('[id="customer\\.firstName"]');;
    readonly lastName: Locator = this.page.locator('[id="customer\\.lastName"]');
    readonly addressStreet: Locator = this.page.locator('[id="customer\\.address\\.street"]');
    readonly addressCity: Locator = this.page.locator('[id="customer\\.address\\.city"]');
    readonly addressState: Locator =this.page.locator('[id="customer\\.address\\.state"]');
    readonly zipCode: Locator = this.page.locator('[id="customer\\.address\\.zipCode"]');
    readonly phoneNumber: Locator = this.page.locator('[id="customer\\.phoneNumber"]');
    readonly socialSecurity: Locator = this.page.locator('[id="customer\\.ssn"]');
    readonly userName: Locator = this.page.locator('[id="customer\\.username"]');
    readonly password: Locator = this.page.locator('[id="customer\\.password"]');
    readonly confirmPassword: Locator = this.page.locator('#repeatedPassword');
    readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' })


    async createUser(): Promise<void>
    {
        const randomNum:number = this.generateRandomNumber(1000,9999);
        const firstName:string = this.generateFirstName(randomNum);
        const password:string = this.generatePassword(firstName);

        await this.firstName.fill(firstName);
        await this.lastName.fill("Swarnajit");
        await this.addressStreet.fill("Baker Street");
        await this.addressCity.fill("London");
        await this.addressState.fill("India");
        await this.zipCode.fill(randomNum.toString());
        await this.phoneNumber.fill(this.generatePhoneNumber());
        await this.socialSecurity.fill(firstName);
        await this.userName.fill(this.generateUserName(firstName));
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        // await this.registerButton.click();
    }

    private generateFirstName(newNumber:number): string
    {
        return `user${newNumber}`;
    }

    private generateUserName(firstName:string): string
    {
        const currentDateTime = Date.now();
        return `${firstName}${currentDateTime}`;
    }

    private generatePassword(firstName:string): string
    {
        const currentDateTime = Date.now();
        return `${currentDateTime}${firstName}`;
    }


    private generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private generatePhoneNumber(): string {
        return Math.floor(Math.random() * 1000000000).toString();
    }
}