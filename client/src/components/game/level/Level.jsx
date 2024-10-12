import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../../../context/GameContext';
import { useParams } from 'react-router-dom';

function Level() {
  const [level, setLevel] = useState(null);
  const { levels } = useContext(GameContext);
  const { levelId } = useParams();

  useEffect(() => {
    setLevel(levels.find((lvl) => lvl.id === levelId));
  }, [levels, levelId]);

  return (
    <>
      {level ? (
        <>
          <header>{`Level ${level.id}`}</header>
          <section>
            <img src={`../../assets/images/${level.title}`} alt="Level Image" />
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
