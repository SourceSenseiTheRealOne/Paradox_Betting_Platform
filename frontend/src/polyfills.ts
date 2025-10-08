// Polyfills for Node.js globals in browser environment
import { Buffer } from 'buffer';

// Make Buffer available globally
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
  (window as any).global = window;
  (window as any).process = {
    env: {},
    version: '',
    platform: 'browser',
    nextTick: (fn: Function) => setTimeout(fn, 0),
  };
}

// Polyfill for randombytes
if (typeof window !== 'undefined' && !(window as any).randomBytes) {
  (window as any).randomBytes = (size: number) => {
    const bytes = new Uint8Array(size);
    crypto.getRandomValues(bytes);
    return Buffer.from(bytes);
  };
}

// Polyfill for crypto.randomBytes (used by some packages)
if (typeof window !== 'undefined' && !(window as any).crypto?.randomBytes) {
  if (!(window as any).crypto) {
    (window as any).crypto = {};
  }
  (window as any).crypto.randomBytes = (size: number) => {
    const bytes = new Uint8Array(size);
    crypto.getRandomValues(bytes);
    return Buffer.from(bytes);
  };
}

// Polyfill for require (minimal implementation)
if (typeof window !== 'undefined' && typeof (window as any).require === 'undefined') {
  (window as any).require = (id: string) => {
    if (id === 'buffer') return { Buffer };
    if (id === 'crypto') return { randomBytes: (window as any).crypto.randomBytes };
    throw new Error(`Module ${id} not found`);
  };
}

export {};
