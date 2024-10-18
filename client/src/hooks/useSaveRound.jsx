import { useState } from 'react';
import { asyncFetch } from '../helpers/fetch';

const useSaveRound = ({ API_URL, level, round, user }) => {
  const [savedRound, setSavedRound] = useState(null);
  const sendResult = async () => {
    if (savedRound) return;
    const existingRound = user.rounds.find((round) => {
      return round.photoId === level.id && round.endTime;
    });
    if (existingRound) {
      setSavedRound(existingRound);
      return;
    }
    const updatedRound = await asyncFetch({
      url: `${API_URL}/rounds`,
      options: {
        method: 'put',
        body: {
          userId: round.userId,
          photoId: round.photoId,
          endTime: new Date(Date.now()),
        },
      },
    });
    setSavedRound(updatedRound);
  };

  return { savedRound, sendResult };
};

export { useSaveRound };
