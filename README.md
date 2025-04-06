# FabricQACodeChallenge

Fabric Group: Code Challenge_Swarnajit Adhikary_Senior Consultant-Automation QA_Remote India Base

Pre-requisite:- Node.js has to be installed and be added as environment variable
You can validate it by opening command prompt and type "node --version"
Expected Result:- Displays the node version currently installed

Follow these steps after that -

1. Clone the git repository in your local machine
2. Go to inside the folder (For example:- use "cd <your folderPath>)
3. Run npm install
4. Run npm init playwright@latest choose "typescript"
5. Run npx playwright install
6. Run npx playwright test

You can run other commands as well.\

Inside that directory, you can run several commands:

npx playwright test
Runs the end-to-end tests.

npx playwright test --ui
Starts the interactive UI mode.

npx playwright test --project=chromium
Runs the tests only on Desktop Chrome.

npx playwright test example
Runs the tests in a specific file.

npx playwright test --debug
Runs the tests in debug mode.

npx playwright codegen
Auto generate tests with Codegen.

Test Cases Covered

1. Registration page textboxes are blank - Expected result: Should display an error and validating the error text
2. Check if confirm password did not match - Expected result: Should display an error and validating the error text
3. Register a user - Expected result: User registration is successful and Welcome message is displayed
4. User credentials are blank - Expected result: Should display an error and validating the error text
5. User credentials are incorrect - Expected result: Should display an error and validating the error text
6. User Login with valid credentials - Expected result: User login is successful and Welcome message is displayed
7. Check for broken links on the homepage - Expected result: All links should respons 200 OK and hence no links should be broken
8. Create a savings account - Expected result: A new savings account can be created from existing accound and fund transfer is successful
9. Bill Payment details are blank - Expected result: Should display an error and validating the error text
10. Bill accounts should be a number - Expected result: Should display an error and validating the error text
11. Bill accounts do not match - Expected result: Should display an error and validating the error text
12. Bill Payment to valid account - Expected result: Bill payment is successful and successful message is displayed
13. Find Transaction - Expected result: Find a transaction by amount and transaction details is displayed
14. API validation for bill payment - Expected result: API validation for the trnsaction details
