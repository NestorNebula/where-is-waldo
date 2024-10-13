import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGame } from '../src/hooks/useGame';
import { getFakeLevel } from '../src/helpers/faker';

const level = getFakeLevel();

describe('handleImageClick', () => {
  it('set state to wait', () => {
    const { result } = renderHook(() => {
      return useGame(level.characters);
    });
    expect(result.current.gameState).toBe('on');
    act(() => {
      result.current.handleImageClick();
    });
    expect(result.current.gameState).toBe('wait');
  });
});
