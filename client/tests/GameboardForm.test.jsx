import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockContext } from './mocks/mocks';
import { getFakeOverRound } from '../src/helpers/faker';
import Gameboard from '../src/components/game/gameboard/Gameboard';

const fakeContext = mockContext(true);

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
        charactersFound: [
          {
            id: fakeContext.levels[0].characters[0].characterId,
            found: false,
          },
          {
            id: fakeContext.levels[0].characters[1].characterId,
            found: false,
          },
          {
            id: fakeContext.levels[0].characters[2].characterId,
            found: false,
          },
          {
            id: fakeContext.levels[0].characters[3].characterId,
            found: false,
          },
          {
            id: fakeContext.levels[0].characters[4].characterId,
            found: false,
          },
        ],
        handleImageClick: () => {},
        handleCharacterClick: () => {},
      };
    },
  };
});

vi.mock('../src/helpers/fetch', () => {
  return {
    asyncFetch: ({ options }) => {
      return getFakeOverRound(options.body.userId, options.body.photoId);
    },
  };
});

vi.mock('../src/hooks/useSaveRound', () => {
  return {
    useSaveRound: () => {
      return {
        savedRound: {},
        sendResult: () => {},
      };
    },
  };
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <Gameboard level={fakeContext.levels[0]} />
    </MemoryRouter>
  );
});

describe('Gameboard Form', () => {
  it('renders form when game state is "over"', () => {
    expect(screen.queryByRole('form', { name: /username/i })).not.toBeNull();
  });

  it('removes form after sending it', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: /username/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    await user.type(input, 'username');
    await user.click(submitBtn);
    expect(screen.queryByRole('form', { name: /username/i })).toBeNull();
  });
});
