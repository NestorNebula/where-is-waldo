import {
  millisecondsToHours,
  hoursToMilliseconds,
  millisecondsToMinutes,
  minutesToMilliseconds,
  millisecondsToSeconds,
  secondsToMilliseconds,
} from 'date-fns';

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
    : `${seconds}seconds`;
};

export { getTimedScore };
