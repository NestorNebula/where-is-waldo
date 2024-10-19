import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../../../context/GameContext';
import { useParams } from 'react-router-dom';
import Gameboard from '../gameboard/Gameboard';
import styles from './Level.module.css';

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
          <header className={styles.header}>{`Level ${level.id}`}</header>
          <section className={styles.section}>
            <Gameboard level={level} />
          </section>
        </>
      ) : (
        <>
          <header className={styles.errorHeader}>Error</header>
          <section className={styles.errorSection}>
            {"The level doesn't exist."}
          </section>
        </>
      )}
    </>
  );
}

export default Level;
