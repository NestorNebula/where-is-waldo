import PropTypes from 'prop-types';

function Character({ character, gameStatus, onClick }) {
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
        <button aria-label="Choose character" onClick={onClick}>
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
  onClick: PropTypes.func.isRequired,
};

export default Character;
