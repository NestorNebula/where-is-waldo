import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockContext } from './mocks/mocks';
import Gameboard from '../src/components/game/gameboard/Gameboard';

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
      <Gameboard />
    </MemoryRouter>
  );
});

describe('Gameboard', () => {
  it('renders img and characters properly', () => {
    expect(screen.queryByRole('img', { name: /level image/i })).not.toBeNull();
    expect(screen.queryAllByAltText(/character/i)).toBe(
      fakeContext.levels[0].characters.length
    );
  });
});
