import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../../../context/GameContext';

function Homepage() {
  const { levels } = useContext(GameContext);
  return (
    <>
      <header>
        <div>Welcome to Where is Waldo?</div>
      </header>
      <section>
        <div>Try to find Waldo and his friends in the levels below!</div>
        <div>
          {levels.map((level) => {
            return (
              <Link key={level.id} to={`/levels/${level.id}`}>
                Level {level.id}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Homepage;
