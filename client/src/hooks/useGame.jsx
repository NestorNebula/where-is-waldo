import { useState } from 'react';

const useGame = (characters) => {
  const [gameState, setGameState] = useState('on');
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

  const handleImageClick = () => {
    if (gameState !== 'on') return;
    setGameState('wait');
  };

  return {
    gameState,
    charactersFound,
    updateCharactersFound,
    handleImageClick,
  };
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
