import PropTypes from 'prop-types';

function Gameboard({ level }) {
  const characters = level.characters;
  return (
    <>
      <img src={`../../assets/images/${level.title}`} alt="Level" />
      <div>
        {characters.map((character, index) => {
          return (
            <div key={`${character.characterId}n${index}`}>
              <div>{character.character.name}</div>
              <img
                src={`../../assets/images/${character.character.avatar}`}
                alt="Character"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

Gameboard.propTypes = {
  level: PropTypes.object.isRequired,
};

export default Gameboard;
