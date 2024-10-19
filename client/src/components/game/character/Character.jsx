import PropTypes from 'prop-types';
import Marker from '../marker/Marker';
import styles from './Character.module.css';

function Character({
  character,
  characterStatus,
  gameStatus,
  coordinates,
  onClick,
}) {
  return (
    <>
      {gameStatus !== 'wait' ? (
        <div
          className={`${styles.character} ${
            characterStatus.found && styles.characterFound
          }`}
        >
          <div>{character.name}</div>
          <img
            src={`../src/assets/images/${character.avatar}`}
            alt="Character"
          />
        </div>
      ) : (
        <button
          className={styles.buttonCharacter}
          disabled={characterStatus.found}
          aria-label="Choose character"
          onClick={() => onClick(character.id)}
        >
          <div>{character.name}</div>
          <img
            src={`../src/assets/images/${character.avatar}`}
            alt="Character"
          />
        </button>
      )}
      <Marker
        coordinates={
          characterStatus && characterStatus.found ? coordinates : null
        }
      />
    </>
  );
}

Character.propTypes = {
  character: PropTypes.object.isRequired,
  characterStatus: PropTypes.object.isRequired,
  gameStatus: PropTypes.string.isRequired,
  coordinates: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Character;
