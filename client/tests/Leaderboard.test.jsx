import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockContext } from './mocks/mocks';
import { getFakeRound, getFakeOverRound } from '../src/helpers/faker';
import Leaderboard from '../src/components/leaderboard/Leaderboard';

const fakeContext = mockContext();
const fakeRounds = [
  [getFakeRound(10, 1), getFakeOverRound(11, 1)],
  [getFakeOverRound(fakeContext.user.id, 2)],
  [getFakeOverRound(15, 3), getFakeOverRound(16, 3)],
];

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => fakeContext,
  };
});

vi.mock('../src/hooks/useLeaderboard', () => {
  return {
    useLeaderboard: () => {
      return {
        roundsLb: fakeRounds,
      };
    },
  };
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <Leaderboard />
    </MemoryRouter>
  );
});

describe('Leaderboard', () => {
  it('renders Leaderboard without error', () => {
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  it('renders Leaderboard without unfinished rounds', () => {
    expect(screen.queryAllByText(/seconds/).length).toBe(1);
  });

  it('changes level when clicking on navigation button', async () => {
    const user = userEvent.setup();
    const navButton = screen.queryByRole('button', { name: /next/ });
    await user.click(navButton);
    await user.click(navButton);
    expect(screen.getAllByText(/seconds/).length).toBe(2);
  });

  it("displays user's score differently", async () => {
    const user = userEvent.setup();
    const navButton = screen.queryByRole('button', { name: /next/ });
    await user.click(navButton);
    expect(screen.queryByText('You')).not.toBeNull();
  });
});
