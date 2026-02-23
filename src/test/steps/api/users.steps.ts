// src/test/steps/api/users.steps.ts
import { Before, Given, When, Then,After } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';

// Définir un type pour le contexte partagé
interface SharedContext {
  apiContext?: any;
  response?: any;
  responseBody?: any;
  userId?: number;
}

const sharedContext: SharedContext = {};

Before(async function() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  
  try {
    sharedContext.apiContext = await request.newContext({
      baseURL: 'https://fakestoreapi.com',
      ignoreHTTPSErrors: true,
      timeout: 30000,
    });
  } catch (error) {
    throw error;
  }
});

When("I call the GET users API {int}", async function(userId: number) {
  try {
    const response = await sharedContext.apiContext.get(`/users/${userId}`);
    sharedContext.response = response;
    sharedContext.userId = userId;
    
    if (response.ok()) {
      sharedContext.responseBody = await response.json();
    }
  } catch (error) {
    console.error('❌ Erreur requête:', error);
    throw error;
  }
});

Then("the response should contain user", async function() {
  expect(sharedContext.response.status()).toBe(200);
  expect(sharedContext.responseBody.id).toBe(sharedContext.userId);
  expect(sharedContext.responseBody.email).toBeDefined();
});

After(async function() {
  if (sharedContext.apiContext) {
    await sharedContext.apiContext.dispose();
  }
});