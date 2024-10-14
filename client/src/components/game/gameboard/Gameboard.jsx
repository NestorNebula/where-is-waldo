import { useContext } from 'react';
import { useRound } from '../../../hooks/useRound';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../context/GameContext';
import { useGame } from '../../../hooks/useGame';
import PropTypes from 'prop-types';
import Character from '../character/Character';

function Gameboard({ level }) {
  const { user } = useContext(GameContext);
  const navigate = useNavigate();

  const { round, error, loading } = useRound(user, level);
  if (round === 'done') {
    navigate('.', { replace: true });
  }

  const characters = level.characters;
  const { gameState, charactersFound, handleImageClick, handleCharacterClick } =
    useGame(characters);

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : loading ? (
        <div>Loading Round...</div>
      ) : (
        <>
          <img
            onClick={handleImageClick}
            src={`../../assets/images/${level.title}`}
            alt="Level"
          />
          <div>
            {characters.map((character, index) => {
              return (
                <Character
                  key={`${character.characterId}n${index}`}
                  character={character.character}
                  characterStatus={charactersFound[index]}
                  gameStatus={gameState}
                  onClick={handleCharacterClick}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

Gameboard.propTypes = {
  level: PropTypes.object.isRequired,
};

export default Gameboard;
