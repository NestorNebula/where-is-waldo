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

  const [coordinates, setCoordinates] = useState(null);
  const handleImageClick = (e) => {
    if (gameState !== 'on') return;
    setCoordinates({ x: e.offsetX, y: e.offsetY });
    setGameState('wait');
  };

  const handleCharacterClick = (characterId) => {
    const character = characters.find(
      (char) => char.characterId === characterId
    );
    if (character && coordinates !== null) {
      if (
        character.coordinates.minX <= coordinates.x &&
        character.coordinates.maxX >= coordinates.x &&
        character.coordinates.minY <= coordinates.y &&
        character.coordinates.maxY >= coordinates.y
      ) {
        updateCharactersFound(characterId);
      }
    }
    setCoordinates(null);
    setGameState('on');
  };

  return {
    gameState,
    charactersFound,
    handleImageClick,
    handleCharacterClick,
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
