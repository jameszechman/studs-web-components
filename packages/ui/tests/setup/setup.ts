// TypeError: window.matchMedia is not a function in Vitest

import { beforeEach, vi } from 'vitest';

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ResizeObserver is not defined on window
// https://github.com/jsdom/jsdom/issues/3368
global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
};

// jsdom issue element animate: https://github.com/jsdom/jsdom/issues/3429
const mockAnimations = () => {
  Element.prototype.animate = vi.fn().mockImplementation(() => ({
    finished: Promise.resolve(),
    cancel: Promise.resolve(),
  }));
};

const initPointerEventForJsDOM = () => {
  (window as any).PointerEvent = MouseEvent;
};

beforeEach(() => {
  mockAnimations();
  initPointerEventForJsDOM();
});
