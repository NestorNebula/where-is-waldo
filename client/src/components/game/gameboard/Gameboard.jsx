import { useContext } from 'react';
import { useRound } from '../../../hooks/useRound';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../context/GameContext';
import { useGame } from '../../../hooks/useGame';
import { useInput } from '../../../hooks/useInput';
import { useSaveRound } from '../../../hooks/useSaveRound';
import { useSendForm } from '../../../hooks/useSendForm';
import PropTypes from 'prop-types';
import Character from '../character/Character';

function Gameboard({ level }) {
  const { user, API_URL } = useContext(GameContext);
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

  const { savedRound, sendResult } = useSaveRound({
    API_URL,
    level,
    round,
    user,
  });
  if (gameState === 'over' && !savedRound) sendResult();
  const { formSent, sendForm } = useSendForm({
    user,
    username: value,
    API_URL,
  });

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
            src={`../src/assets/images/${level.title}`}
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
                  coordinates={JSON.parse(character.coordinates)}
                  onClick={handleCharacterClick}
                />
              );
            })}
          </div>
          {gameState === 'over' && !formSent
            ? !user.username && (
                <form aria-label="Submit Username" onSubmit={sendForm}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      name="username"
                      value={value}
                      onChange={updateValue}
                    />
                    <span>
                      {validation.isValid ? null : validation.message}
                    </span>
                  </div>
                  <button>Submit</button>
                </form>
              )
            : null}
          {gameState === 'over' && savedRound ? (
            <div>Your saved score is {savedRound.score}!</div>
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
