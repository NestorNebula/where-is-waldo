import PropTypes from 'prop-types';

function Character({ character, gameStatus }) {
  return (
    <>
      {gameStatus !== 'wait' ? (
        <div>
          <div>{character.name}</div>
          <img
            src={`../../assets/images/${character.avatar}`}
            alt="Character"
          />
        </div>
      ) : (
        <button aria-label="Choose character">
          <div>{character.name}</div>
          <img
            src={`../../assets/images/${character.avatar}`}
            alt="Character"
          />
        </button>
      )}
    </>
  );
}

Character.propTypes = {
  character: PropTypes.object.isRequired,
  gameStatus: PropTypes.string.isRequired,
};

export default Character;
