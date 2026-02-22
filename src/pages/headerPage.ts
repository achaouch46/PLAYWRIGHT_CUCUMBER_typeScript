import { expect, Page, Locator } from '@playwright/test';
import { fixture } from '../hooks/pageFixture';

export default class HeaderPage {
  readonly page: Page;

  // 🎯 Locators
  readonly searchInput: Locator;
  readonly cartButton: Locator;
  readonly loginButton: Locator;
  readonly userMenuButton: Locator;
  readonly myOrdersButton: Locator;
  readonly logoutButton: Locator;
  readonly userNameLabel: Locator;


  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByPlaceholder('Search books or authors');
    this.cartButton = page.getByRole('button', { name: 'shopping_cart' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.userMenuButton = page.locator('a.mat-mdc-menu-trigger');
    this.myOrdersButton = page.getByRole('menuitem', { name: 'My Orders' });
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    this.userNameLabel = this.userMenuButton.locator('span.mdc-button__label span');
  }

  // 🧩 Actions
  async clickLogin() {
    await this.loginButton.click();
  }

  async openUserMenu() {
    await this.userMenuButton.click();
  }

  async openMyOrders() {
    await this.openUserMenu();
    await this.myOrdersButton.click();
  }

  async logout() {
    await this.openUserMenu();
    await this.logoutButton.click();
  }

  // ✅ Assertions
  async verifyLoginSuccess() {
    await expect(this.userNameLabel).toBeVisible();
        const userName = await this.userNameLabel.textContent();
        console.log("Username: " + userName);
        fixture.logger.info("Username: " + userName);

  }
}