import { useContext } from 'react';
import { useRound } from '../../../hooks/useRound';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../context/GameContext';
import { useGame } from '../../../hooks/useGame';
import { useInput } from '../../../hooks/useInput';
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

  const usernameValidation = (username) => {
    let message = '';
    if (username.length < 3) {
      message += 'Username must have at least 3 characters.';
    }
    const regex = new RegExp('^[A-Z][A-Z0-9-_.@]*[A-Z]$', 'i');
    const match = regex.test(username);
    if (!match)
      message +=
        'Username must start/end with a letter and can only contain letters, numbers, dashes and points.';
    return message;
  };
  const { value, updateValue, validation } = useInput(usernameValidation);

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
          {gameState === 'over' ? (
            <form aria-label="Submit Username">
              <div>
                <label htmlFor="username">Input</label>
                <input
                  id="username"
                  name="username"
                  value={value}
                  onChange={updateValue}
                />
                <span>{validation.isValid ? null : validation.message}</span>
              </div>
              <button type="button">Submit</button>
            </form>
          ) : null}
        </>
      )}
    </>
  );
}

Gameboard.propTypes = {
  level: PropTypes.object.isRequired,
};

export default Gameboard;
