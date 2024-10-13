import { useState } from 'react';

const useGame = (characters) => {
  const [gameState, setGameState] = useState('start');
  const [charactersFound, setCharactersFound] = useState(
    getCharactersState(characters)
  );
  const updateCharactersFound = (id) => {
    const updated = charactersFound.map((char) => {
      if (char.id === id) {
        return {
          id: char.id,
          found: !char.found,
        };
      } else {
        return char;
      }
    });
    setCharactersFound(updated);
  };

  return { gameState, updateCharactersFound };
};

const getCharactersState = (characters) => {
  return characters.map((character) => {
    return {
      id: character.characterId,
      found: false,
    };
  });
};

export { useGame };
