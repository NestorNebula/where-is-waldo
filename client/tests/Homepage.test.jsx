import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../src/components/page/homepage/Homepage';
import { mockContext } from './mocks/mocks';

const fakeContext = mockContext();

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  const { mockContext } = await import('./mocks/mocks.js');
  return {
    ...actual,
    useContext: mockContext,
  };
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  );
});

describe('Homepage', () => {
  it('renders homepage', () => {
    expect(screen.queryByText(/Welcome/)).not.toBeNull();
  });

  it('renders levels', () => {
    expect(screen.getAllByRole('link').length).toBe(fakeContext.levels.length);
  });
});
