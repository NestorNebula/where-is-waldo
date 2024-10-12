import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Level from '../src/components/game/level/Level';
import { mockContext } from './mocks/mocks';

const fakeContext = mockContext();

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => fakeContext,
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => {
      return {
        levelId: fakeContext.levels[0].id,
      };
    },
  };
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <Level />
    </MemoryRouter>
  );
});

describe('Level', () => {
  it('renders level without error', () => {
    expect(screen.queryByRole('img', { name: /level/i })).not.toBeNull();
  });
});
