import { TextDecoder, TextEncoder } from 'util';
import fetch from 'node-fetch';

// jsdom 환경에는 TextEncoder/TextDecoder가 없어 react-router 로드 시 실패한다
Object.assign(global, { TextEncoder, TextDecoder });

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
