import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { OverviewPage } from '../pages/OverviewPage';
import { TransferFundPage } from '../pages/TransferFundPage';
import { FindTransactionPage } from '../pages/FindTransactionPage';
import { Utility } from '../utility/Utility';
import { BillPaymentpage } from '../pages/BillPaymentpage';
import { BasePage } from '../pages/BasePage';

let homePage: HomePage;
let registerPage: RegisterPage;
let page: Page;
let overviewPage: OverviewPage;
let transferFundPage: TransferFundPage;
let findTransactionPage: FindTransactionPage;
let billPaymentpage: BillPaymentpage;

var fromAccountNum: string = '';
var existingAccountNum: string = '';
var correctAccountNum: string = Utility.getValue('billAccountNum');
var incorrectAccountNum: string = '1234';
var wrongUsername: string = 'Sample User';
var wrongPassword: string = 'Sample Pass';

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();

	homePage = await new HomePage(page).gotoHomePage();
});

test.describe.skip('Registration page tests', async () => {
	test.beforeAll(async () => {
		registerPage = await homePage.openRegisterPage();

		await expect(registerPage.registerButton).toBeVisible();
	});

	test('Registration page textboxes are blank', async () => {
		await registerPage.page.waitForTimeout(registerPage.TIMEOUT_01_SECOND);

		await registerPage.registerButton.click();

		await expect(
			registerPage.page.getByText('First name is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('Last name is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('Address is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('City is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('State is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('Zip Code is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('Social Security Number is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('Username is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('Password is required.')
		).toBeVisible();

		await expect(
			registerPage.page.getByText('Password confirmation is required.')
		).toBeVisible();
	});

	test('Check if confirm password did not match', async () => {
		await registerPage.inputUserDetails();

		await registerPage.inputPassword(
			Utility.getValue('password'),
			wrongPassword
		);

		await registerPage.registerButton.click();

		await expect(
			registerPage.page.getByText('Passwords did not match.')
		).toBeVisible();
	});

	test('Register a user', async () => {
		await registerPage.inputUserDetails();

		await registerPage.inputPassword(
			Utility.getValue('password'),
			Utility.getValue('password')
		);

		await registerPage.registerButton.click();

		expect(await registerPage.welcomeMessage.innerText()).toContain(
			'Your account was created'
		);

		expect(await registerPage.welcomeMessage.innerText()).toContain(
			`Welcome ${registerPage.userName}`
		);

		await registerPage.logOutLink.click();

		await expect(registerPage.firstNameLocator).not.toBeVisible();
	});
});

test.describe.skip('Bank application activities', async () => {
	test('User credentials are blank', async () => {
		await homePage.tryUnsuccessfulLogin('', '');

		await expect(homePage.errorHeader).toBeVisible();

		await expect(
			homePage.page.getByText('Please enter a username and password.')
		).toBeVisible();
	});

	test('User credentials are incorrect', async () => {
		await homePage.tryUnsuccessfulLogin(wrongUsername, wrongPassword);

		await expect(homePage.errorHeader).toBeVisible();

		await expect(
			homePage.page.getByText(
				'An internal error has occurred and has been logged.'
			)
		).toBeVisible();
	});

	test('User Login with valid credentials', async () => {
		overviewPage = await homePage.loginToApplication();

		expect(await overviewPage.showsNameOnSuccess.innerText()).toContain(
			'Welcome'
		);

		const regex = /^[0-9]+$/;

		while (!existingAccountNum || !regex.test(existingAccountNum)) {
			existingAccountNum = await overviewPage.accountNum.innerText();

			await new Promise((resolve) =>
				setTimeout(resolve, overviewPage.TIMEOUT_01_SECOND)
			);
		}

		expect(await overviewPage.accountBalance.innerText()).toMatch(
			/\$\d+(\.\d{1,2})?/
		);

		expect(await overviewPage.availableAmount.innerText()).toMatch(
			/\$\d+(\.\d{1,2})?/
		);
	});

	test('Bill Payment details are blank', async () => {
		billPaymentpage = await overviewPage.gotoBillPayment();

		await new Promise((resolve) =>
			setTimeout(resolve, billPaymentpage.TIMEOUT_01_SECOND)
		);

		await billPaymentpage.sendPaymentButton.click();

		await expect(
			billPaymentpage.page.getByText('Payee name is required.')
		).toBeVisible();

		await expect(
			billPaymentpage.page.getByText('Address is required.')
		).toBeVisible();

		await expect(
			billPaymentpage.page.getByText('City is required.')
		).toBeVisible();

		await expect(
			billPaymentpage.page.getByText('State is required.')
		).toBeVisible();

		await expect(
			billPaymentpage.page.getByText('Zip Code is required.')
		).toBeVisible();

		await expect(
			billPaymentpage.page.getByText('Phone number is required.')
		).toBeVisible();

		await expect(
			billPaymentpage.page.locator('#validationModel-account-empty')
		).toBeVisible();

		await expect(
			billPaymentpage.page.locator('#validationModel-verifyAccount-empty')
		).toBeVisible();

		await expect(
			billPaymentpage.page.getByText('The amount cannot be empty')
		).toBeVisible();
	});

	test('Bill accounts should be a number', async () => {
		billPaymentpage = await overviewPage.gotoBillPayment();

		await billPaymentpage.enterAccountDetails(wrongUsername, wrongPassword);

		await new Promise((resolve) =>
			setTimeout(resolve, billPaymentpage.TIMEOUT_01_SECOND)
		);

		await billPaymentpage.sendPaymentButton.click();

		await expect(
			billPaymentpage.page.locator('#validationModel-account-invalid')
		).toBeVisible();

		await expect(
			billPaymentpage.page.locator('#validationModel-verifyAccount-invalid')
		).toBeVisible();
	});

	test('Bill accounts do not match', async () => {
		billPaymentpage = await overviewPage.gotoBillPayment();

		await new Promise((resolve) =>
			setTimeout(resolve, billPaymentpage.TIMEOUT_01_SECOND)
		);

		await billPaymentpage.enterBillDetails();

		await billPaymentpage.enterAccountDetails(
			correctAccountNum,
			incorrectAccountNum
		);

		await billPaymentpage.sendPaymentButton.click();

		await expect(
			billPaymentpage.page.getByText('The account numbers do not match.')
		).toBeVisible();
	});

	test('Bill Payment with valid details', async () => {
		billPaymentpage = await overviewPage.gotoBillPayment();

		await expect(billPaymentpage.sendPaymentButton).toBeVisible();

		await new Promise((resolve) =>
			setTimeout(resolve, billPaymentpage.TIMEOUT_01_SECOND)
		);

		await billPaymentpage.enterBillDetails();

		await billPaymentpage.enterAccountDetails(
			correctAccountNum,
			correctAccountNum
		);

		await billPaymentpage.sendPaymentButton.click();

		await expect(billPaymentpage.successfulPaymentHeader).toBeVisible();
	});

	test('Find Transaction', async () => {
		findTransactionPage = await overviewPage.gotoFindTransactionPage();

		await expect(findTransactionPage.findTransactionHeader).toBeVisible();

		await findTransactionPage.enterAmount.fill(Utility.getValue('amount'));

		await findTransactionPage.findByAmountButton.click();

		await expect(findTransactionPage.transactionResultHeader).toBeInViewport();

		expect(
			await findTransactionPage.billPaymentTransaction.isVisible(),
			'No bill payment was completed'
		).toBeTruthy();

		expect(
			await findTransactionPage.billPaymentTransaction.innerText(),
			'No bill payment was completed'
		).toContain(Utility.getValue('payeeName'));

		await findTransactionPage.fundTransferTransaction.click();

		await findTransactionPage.transactionId.isVisible();
	});

	test('Get API call', async () => {
		const apiEndPoint = `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${existingAccountNum}/transactions/amount/100`;

		const response = await page.request.get(apiEndPoint, {
			headers: {
				Authorization:
					'Basic ' +
					Buffer.from(
						`${Utility.getValue('userName')}:${Utility.getValue('password')}`
					).toString(),
			},
		});

		const responseBody = await response.json();

		console.log(responseBody);
	});
});

test.skip('Get Account number', async () => {
	await overviewPage.openNewAccountLink.click();

	await overviewPage.openNewAccountButton.waitFor();

	await overviewPage.page.waitForFunction(
		(element) => element?.textContent?.trim() !== '',
		await overviewPage.fromAccountId.elementHandle()
	);

	fromAccountNum = await overviewPage.fromAccountId.innerText();

	expect(fromAccountNum).toEqual(existingAccountNum);

	await overviewPage.typeOfAccount.selectOption('1');

	await overviewPage.openNewAccountButton.click();

	await expect(overviewPage.accountOpenedHeading).toBeInViewport();

	expect(await overviewPage.newAccountId.innerText()).toBeTruthy();

	var addedAccountNum = await overviewPage.newAccountId.innerText();

	transferFundPage = await overviewPage.gotoTransferPage();

	await expect(transferFundPage.amountBox).toBeVisible();

	await transferFundPage.amountBox.fill(Utility.getValue('amount'));

	await transferFundPage.fromAccount.selectOption(existingAccountNum);

	await transferFundPage.toAccount.selectOption(addedAccountNum);

	await transferFundPage.transferButton.click();
});

test.afterAll(async ({ browser }) => {});

// https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/21669/transaction

// https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${existingAccountNum}/transactions/amount/100`;
