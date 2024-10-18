import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../src/components/page/homepage/Homepage';
import { mockContext } from './mocks/mocks';

const fakeContext = mockContext();

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => fakeContext,
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
    expect(screen.getAllByRole('button', { name: /level/i }).length).toBe(
      fakeContext.levels.length
    );
  });
});
