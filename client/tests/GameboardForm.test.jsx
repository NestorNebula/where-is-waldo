import { describe, expect, it, vi } from 'vitest';
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

vi.mock('../src/hooks/useGame', () => {
  return {
    useGame: () => {
      return {
        gameState: 'over',
        charactersFound: [],
        handleImageClick: () => {},
        handleCharacterClick: () => {},
      };
    },
  };
});

describe('Gameboard Form', () => {
  it('renders form when game state is "over"', () => {
    render(
      <MemoryRouter>
        <Gameboard level={fakeContext.levels[0]} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('form', { name: /username/i })).not.toBeNull();
  });
});
