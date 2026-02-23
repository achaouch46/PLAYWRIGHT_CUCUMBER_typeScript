import { When, Then, Before, After } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';

interface SharedContext {
  apiContext?: any;
  response?: any;
  responseBody?: any;
}

const sharedContext: SharedContext = {};

Before(async function() {
  sharedContext.apiContext = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
    ignoreHTTPSErrors: true,
    timeout: 30000,
  });
});

When("I call the GET user API {int}", async function(userId: number) {
  sharedContext.response = await sharedContext.apiContext.get(`/users/${userId}`);

  if (sharedContext.response.ok()) {
    sharedContext.responseBody = await sharedContext.response.json();
  } else {
    console.error(`❌ Response status: ${sharedContext.response.status()}`);
    sharedContext.responseBody = {};
  }
});

Then("the response should contain the user data", async function() {
  expect(sharedContext.response.status()).toBe(200);
  expect(sharedContext.responseBody.id).toBe(2);
  expect(sharedContext.responseBody.name).toBeDefined();
  expect(sharedContext.responseBody.email).toBeDefined();
});

After(async function() {
  if (sharedContext.apiContext) {
    await sharedContext.apiContext.dispose();
  }
});