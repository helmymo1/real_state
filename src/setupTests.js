import '@testing-library/jest-dom';

window.matchMedia = query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

window.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock('./components/functions/AnimationTitles', () => ({
  __esModule: true,
  default: ({ title }) => <h1>{title}</h1>,
}));
