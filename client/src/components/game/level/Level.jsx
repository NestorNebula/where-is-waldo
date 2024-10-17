import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../../../context/GameContext';
import { useParams } from 'react-router-dom';
import Gameboard from '../gameboard/Gameboard';

function Level() {
  const [level, setLevel] = useState(null);
  const { levels } = useContext(GameContext);
  const { levelId } = useParams();

  useEffect(() => {
    setLevel(levels.find((lvl) => lvl.id === +levelId));
  }, [levels, levelId]);

  return (
    <>
      {level ? (
        <>
          <header>{`Level ${level.id}`}</header>
          <section>
            <Gameboard level={level} />
          </section>
        </>
      ) : (
        <>
          <header>Error</header>
          <section>{"The level doesn't exist."}</section>
        </>
      )}
    </>
  );
}

export default Level;
