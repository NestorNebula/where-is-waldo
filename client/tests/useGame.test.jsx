import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGame } from '../src/hooks/useGame';
import { getFakeLevel, getFakeCoordinates } from '../src/helpers/faker';

const level = getFakeLevel();

describe('handleImageClick', () => {
  it('set state to wait', () => {
    const { result } = renderHook(() => {
      return useGame(level.characters);
    });
    expect(result.current.gameState).toBe('on');
    act(() => {
      result.current.handleImageClick({});
    });
    expect(result.current.gameState).toBe('wait');
  });
});

describe('handleCharacterClick', () => {
  it('set state back to on after image click & handles wrong click', () => {
    const { result } = renderHook(() => {
      return useGame(level.characters);
    });
    const fakeCoordinates = getFakeCoordinates();
    act(() => {
      result.current.handleImageClick({
        offsetX: fakeCoordinates.minX,
        offsetY: fakeCoordinates.maxY,
      });
    });
    console.log(result.current.gameState);

    act(() => {
      result.current.handleCharacterClick(level.characters[0].characterId);
    });
    expect(result.current.gameState).toBe('on');
    expect(result.current.charactersFound[0].found).toBeFalsy();
  });

  it('handles correct click', () => {
    const { result } = renderHook(() => {
      return useGame(level.characters);
    });
    act(() => {
      result.current.handleImageClick({
        offsetX: level.characters[0].coordinates.minX + 0.5,
        offsetY: level.characters[0].coordinates.minY + 0.5,
      });
    });
    act(() => {
      result.current.handleCharacterClick(level.characters[0].characterId);
    });
    expect(result.current.charactersFound[0].found).toBeTruthy();
  });
});
