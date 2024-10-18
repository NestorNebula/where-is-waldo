import { useState } from 'react';

const useGame = (characters) => {
  const [gameState, setGameState] = useState('on');
  const checkGameOver = (charFounds) => {
    if (
      charFounds.every((character) => {
        return character.found === true;
      }) === true
    ) {
      setGameState('over');
      return true;
    }
    return false;
  };
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
    return updated;
  };

  const [coordinates, setCoordinates] = useState(null);
  const handleImageClick = (e) => {
    if (gameState !== 'on') return;
    if (e.nativeEvent) {
      setCoordinates({
        x: getClickPercentage(e.nativeEvent.offsetX, e.target.width),
        y: getClickPercentage(e.nativeEvent.offsetY, e.target.height),
      });
    } else if (e.offsetX) {
      setCoordinates({ x: e.offsetX, y: e.offsetY });
    } else {
      return;
    }
    setGameState('wait');
  };

  const handleCharacterClick = (characterId) => {
    let result = false;
    const character = characters.find(
      (char) => char.characterId === characterId
    );
    if (character && coordinates !== null) {
      if (typeof character.coordinates === 'string') {
        character.coordinates = JSON.parse(character.coordinates);
      }
      if (
        character.coordinates.minX <= coordinates.x &&
        character.coordinates.maxX >= coordinates.x &&
        character.coordinates.minY <= coordinates.y &&
        character.coordinates.maxY >= coordinates.y
      ) {
        const updated = updateCharactersFound(characterId);
        result = checkGameOver(updated);
      }
    }
    setCoordinates(null);
    !result && gameState !== 'over' ? setGameState('on') : null;
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

const getClickPercentage = (value, max) => {
  return (value * 100) / max;
};

export { useGame };
