import { request, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

export async function getApiContext() {
  if (!apiContext) {
    apiContext = await request.newContext({
      baseURL: 'https://reqres.in/api', // exemple
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }
  return apiContext;
}