// src/test/steps/api/users.steps.ts
import { Before, Given, When, Then, After } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';

// Correction: déclaration correcte de la constante
const baseURL = 'https://fakestoreapi.com';

// Optionnel: créer l'apiContext avant les tests
Before(async function() {
  // Créer un contexte API si pas déjà fait
  if (!this.apiContext) {
    this.apiContext = await request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: {
        'Accept': 'application/json',
      },
    });
  }
});

When("I call the GET users API {int}", async function(userId: number) {
  try {
    // Vérifier que apiContext existe
    if (!this.apiContext) {
      throw new Error('apiContext non initialisé. Vérifier le hook Before.');
    }

    const response = await this.apiContext.get(`/users/${userId}`);
    
    // Stocker dans this
    this.response = response;
    this.userId = userId;
    
    if (response.ok()) {
      this.responseBody = await response.json();
      
      // Debug log optionnel
      console.log(`✅ API call successful for user ${userId}: ${response.status()}`);
    } else {
      console.error(`❌ Response status: ${response.status()}`);
      const errorText = await response.text();
      console.error(`❌ Response body:`, errorText);
      this.responseBody = {};
    }
  } catch (error) {
    console.error('❌ Erreur requête API:', error);
    throw error;
  }
});

Then("the response should contain user", async function() {
  // Vérifications avec messages d'erreur explicites
  expect(this.response, "No response found - did you call the API first?").toBeDefined();
  expect(this.responseBody, "No response body found - did you call the API first?").toBeDefined();
  expect(this.userId, "No userId found - did you call the API first?").toBeDefined();
  
  // Log de debug pour voir ce qu'on reçoit
  console.log('🔍 Response status:', this.response.status());
  console.log('🔍 Response body:', this.responseBody);
  
  // Assertions
  expect(this.response.status(), `Expected status 200 but got ${this.response.status()}`).toBe(200);
  expect(this.responseBody.id, `Expected userId ${this.userId} but got ${this.responseBody?.id}`).toBe(this.userId);
  expect(this.responseBody.email, "Email should be defined").toBeDefined();
});

// Nettoyage optionnel
After(async function() {
  this.response = null;
  this.responseBody = null;
  this.userId = null;
});