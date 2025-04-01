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
}