import { setup } from 'axios-cache-adapter';

const api = setup({
  baseURL: 'https://dog.ceo/api',
});

export default api;
