import { useContext } from 'react';
import { useRound } from '../../../hooks/useRound';
import { GameContext } from '../../../context/GameContext';
import { useGame } from '../../../hooks/useGame';
import { useInput } from '../../../hooks/useInput';
import { useSaveRound } from '../../../hooks/useSaveRound';
import { useSendForm } from '../../../hooks/useSendForm';
import { getTimedScore } from '../../../helpers/time';
import PropTypes from 'prop-types';
import Character from '../character/Character';
import Marker from '../marker/Marker';
import styles from './Gameboard.module.css';

function Gameboard({ level }) {
  const { user, API_URL } = useContext(GameContext);

  const { round, error, loading } = useRound(user, level);

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
        <div className={styles.error}>{error}</div>
      ) : loading ? (
        <div className={styles.loading}>Loading Round...</div>
      ) : (
        <>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              onClick={handleImageClick}
              src={`/assets/images/${level.title}`}
              alt="Level"
            />
            {characters.map((character, index) => {
              const coordinates =
                typeof character.coordinates === 'string'
                  ? JSON.parse(character.coordinates)
                  : character.coordinates;
              return (
                <Marker
                  key={character.characterId}
                  coordinates={coordinates}
                  found={charactersFound[index].found}
                />
              );
            })}
          </div>
          <div className={styles.characters}>
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
          {gameState === 'over' && !formSent
            ? !user.username && (
                <form
                  className={styles.form}
                  aria-label="Submit Username"
                  onSubmit={sendForm}
                >
                  <div>
                    <div>Congratulations! </div>
                    <div>Your score has been saved.</div>
                    <div>Please enter your username.</div>
                  </div>
                  <div className={styles.formInput}>
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
          {gameState === 'over' && savedRound && savedRound.score ? (
            <div className={styles.savedScore}>
              Your saved score is {getTimedScore(savedRound.score)}!
            </div>
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
