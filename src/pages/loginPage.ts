import { expect, Page, Locator } from "@playwright/test";

export default class LoginPage {
  readonly page: Page;

  // 🎯 Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.locator('mat-card-actions').getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByRole("alert");
  }

  // 🧩 Actions
  async navigateToLoginPage() {
    await this.page.goto("/login");
    await expect(this.page).toHaveTitle(/BookCart/);
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async loginUser(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  // ✅ Assertions
  async verifyErrorMessageVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}