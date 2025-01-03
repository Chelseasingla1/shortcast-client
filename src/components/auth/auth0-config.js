// src/auth/auth0-config.js

export const auth0Config = {
    domain: "YOUR_AUTH0_DOMAIN", // e.g., "dev-xyz123.us.auth0.com"
    clientId: "YOUR_AUTH0_CLIENT_ID",
    redirectUri: window.location.origin,
    audience: "YOUR_API_IDENTIFIER", // Optional: If you have an API
    scope: "openid profile email"
  };