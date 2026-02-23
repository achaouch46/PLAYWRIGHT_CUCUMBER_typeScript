import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getApiContext } from '../../../helper/util/apiContext';

let response: any;

When('I call the GET users API', async function () {
  const api = await getApiContext();
  response = await api.get('/users?page=2');
});

Then('the response status should be {int}', async function (status: number) {
  expect(response.status()).toBe(status);
});

Then('the response should contain users', async function () {
  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);
});