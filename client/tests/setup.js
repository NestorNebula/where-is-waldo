import { vi, expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { getFakeRound } from '../src/helpers/faker';

expect.extend(matchers);

beforeAll(() => {
  vi.mock('../src/hooks/useRound', () => {
    return {
      useRound: () => {
        return {
          round: getFakeRound(),
          error: null,
          loading: false,
        };
      },
    };
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
