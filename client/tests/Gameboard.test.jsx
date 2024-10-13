import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

vi.mock('../src/hooks/useRound', () => {
  return {
    useRound: () => {
      return {
        round: [],
        error: null,
        loading: false,
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

describe('Gameboard', () => {
  it('renders img and characters properly', () => {
    expect(screen.queryByRole('img', { name: /level/i })).not.toBeNull();
    expect(screen.queryAllByAltText(/character/i).length).toBe(
      fakeContext.levels[0].characters.length
    );
  });

  it('waits for character choice after click on image', async () => {
    const user = userEvent.setup();
    const image = screen.getByRole('img', { name: /level/i });
    await user.click(image);
    expect(screen.queryAllByRole('button', { name: /choose/i }).length).toBe(
      fakeContext.levels[0].characters.length
    );
  });
});
