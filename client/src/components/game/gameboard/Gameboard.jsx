import PropTypes from 'prop-types';
import Character from '../character/Character';

function Gameboard({ level }) {
  const characters = level.characters;
  return (
    <>
      <img src={`../../assets/images/${level.title}`} alt="Level" />
      <div>
        {characters.map((character, index) => {
          return (
            <Character
              key={`${character.characterId}n${index}`}
              character={character.character}
            />
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
