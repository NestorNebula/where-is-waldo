import { useContext, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import {
  millisecondsToHours,
  hoursToMilliseconds,
  millisecondsToMinutes,
  minutesToMilliseconds,
  millisecondsToSeconds,
  secondsToMilliseconds,
} from 'date-fns';

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

  const getTimedScore = (score) => {
    let scoreToConvert = score;
    const hours = millisecondsToHours(scoreToConvert);
    scoreToConvert -= hoursToMilliseconds(hours);
    const minutes = millisecondsToMinutes(scoreToConvert);
    scoreToConvert -= minutesToMilliseconds(minutes);
    const seconds = millisecondsToSeconds(scoreToConvert);
    scoreToConvert -= secondsToMilliseconds(seconds);
    return hours
      ? `${hours}h ${minutes}min ${seconds}seconds`
      : minutes
      ? `${minutes}min ${seconds}seconds`
      : `${seconds}seconds ${scoreToConvert}`;
  };

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : loading ? (
        <div>Loading Leaderboard...</div>
      ) : (
        <>
          <header>
            <div>Leaderboard</div>
          </header>
          <section>
            <div>
              <button
                aria-label="previous level"
                onClick={() => updateDisplayedLevel('left')}
              ></button>
              <div>Level {levels[displayedLevel].id}</div>
              <button
                aria-label="next level"
                onClick={() => updateDisplayedLevel('right')}
              ></button>
            </div>
            <div>
              {roundsLb[displayedLevel].map((round) => {
                return (
                  round.score && (
                    <div key={round.userId + round.photoId}>
                      <div>
                        {round.userId === user.id ? 'You' : round.user.username}
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
