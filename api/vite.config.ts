import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: './src',
    env: {
      PASSWORD_SALT: 'mocked-salt',
      TOKEN_PRIVATE_KEY: 'mocked-token-private-key',
      TOKEN_EXPIRES_IN: '15m',
      TEMPORARY_REFRESH_TOKEN_EXPIRES_IN: '30m',
      REFRESH_TOKEN_EXPIRES_IN: '15d'
    }
  }
});
