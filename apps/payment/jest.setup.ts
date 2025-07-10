import fetch, { Response as NodeFetchResponse } from 'node-fetch';

global.fetch = fetch as unknown as typeof global.fetch;
global.Response = fetch.Response as unknown as typeof Response;

const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  configurable: true,
});
