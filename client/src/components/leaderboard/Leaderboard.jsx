import { useContext, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { getTimedScore } from '../../helpers/time';
import styles from './Leaderboard.module.css';
import arrow from '../../assets/icons/arrow.svg';

function Leaderboard() {
  const { user, levels } = useContext(GameContext);
  const { roundsLb, error, loading } = useLeaderboard(levels);
  const [displayedLevel, setDisplayedLevel] = useState(0);
  const updateDisplayedLevel = (direction) => {
    if (direction === 'left') {
      setDisplayedLevel(
        displayedLevel - 1 >= 0 ? displayedLevel - 1 : roundsLb.length - 1
      );
    } else if (direction === 'right') {
      setDisplayedLevel(
        displayedLevel + 1 < roundsLb.length ? displayedLevel + 1 : 0
      );
    }
  };

  return (
    <>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : loading ? (
        <div className={styles.loading}>Loading Leaderboard...</div>
      ) : (
        <>
          <div className={styles.background}>
            <img src={`../src/assets/images/image${displayedLevel + 1}.jpg`} />
          </div>
          <header className={styles.header}>
            <div>Leaderboard</div>
          </header>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <button
                aria-label="previous level"
                onClick={() => updateDisplayedLevel('left')}
              >
                <img src={arrow} />
              </button>
              <div>Level {levels[displayedLevel].id}</div>
              <button
                aria-label="next level"
                onClick={() => updateDisplayedLevel('right')}
              >
                <img style={{ transform: 'rotate(180deg)' }} src={arrow} />
              </button>
            </div>
            <div className={styles.rounds}>
              {roundsLb[displayedLevel].map((round, index) => {
                return (
                  round.score && (
                    <div
                      className={styles.round}
                      key={round.userId + round.photoId}
                    >
                      <div>{index + 1}</div>
                      <div>
                        {round.userId === user.id
                          ? 'You'
                          : round.user.username
                          ? round.user.username
                          : 'Anonymous'}
                      </div>
                      <div>{getTimedScore(round.score)}</div>
                    </div>
                  )
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Leaderboard;
