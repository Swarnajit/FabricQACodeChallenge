import { Locator, Page } from "@playwright/test";
import { RegisterPage } from "./RegisterPage";
import { BasePage } from "./BasePage";
import { Credentials } from "../playwright.config";

export class HomePage extends BasePage
{
    readonly registerLink: Locator = this.page.getByRole('link', { name: 'Register' });
    readonly gettingStartedHeader: Locator;
    readonly pomLink: Locator;
    readonly tocList: Locator;

    async gotoHomePage(): Promise<HomePage>
    {
        await this.page.goto(Credentials.CONFIG_URL);
        return Promise.resolve(new HomePage(this.page));
    }

    async openRegisterPage(): Promise<RegisterPage>
    {
        await this.registerLink.click();
        return Promise.resolve(new RegisterPage(this.page));
    }
}