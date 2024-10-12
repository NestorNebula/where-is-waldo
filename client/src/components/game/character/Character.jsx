import PropTypes from 'prop-types';

function Character({ character }) {
  return (
    <div>
      <div>{character.name}</div>
      <img src={`../../assets/images/${character.avatar}`} alt="Character" />
    </div>
  );
}

Character.propTypes = {
  character: PropTypes.object.isRequired,
};

export default Character;
