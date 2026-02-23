import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../../hooks/pageFixture";
import HeaderPage from "../../../pages/headerPage";
import LoginPage from "../../../pages/loginPage";

import Assert from "../../../helper/wrapper/assert";

let headerPage: HeaderPage;
let loginPage: LoginPage;
let assert: Assert;


setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application")
})

Given('User click on the login link', async function () {
    await fixture.page.locator("//span[text()='Login']").click();
});


Given('User click on the login link to connect', async function () {
       headerPage = new HeaderPage(fixture.page);
        await headerPage.clickLogin();
});

Given('User enter the username as {string}', async function (username) {
        loginPage = new LoginPage(fixture.page);
        await loginPage.enterUsername(username);
    });

Given('User enter the password as {string}', async function (password) {
  loginPage = new LoginPage(fixture.page);
        await loginPage.enterPassword(password);})

When('User click on the login button', async function () {
    loginPage = new LoginPage(fixture.page);
        await loginPage.clickLoginButton();
});


Then('Login should be success', async function () {
    headerPage = new HeaderPage(fixture.page);
    await headerPage.verifyLoginSuccess();
   
})

When('Login should fail', async function () {
    const failureMesssage = fixture.page.locator("mat-error[role='alert']");
    await expect(failureMesssage).toBeVisible();
});
