import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../context/GameContext';
import { promiseFetch } from '../../../helpers/fetch';

function Homepage() {
  const { user, setUser, levels, API_URL } = useContext(GameContext);
  const navigate = useNavigate();

  const createRound = async (levelId) => {
    const savedRound = user.rounds.find((r) => r.photoId === levelId);
    if (savedRound) {
      return navigate(`/levels/${levelId}`);
    } else {
      promiseFetch({
        url: `${API_URL}/rounds`,
        options: {
          method: 'post',
          body: {
            userId: user.id,
            photoId: levelId,
          },
        },
      }).then(() => {
        promiseFetch({
          url: `${API_URL}/users/${user.id}`,
          options: { method: 'get', body: null },
        }).then((updatedUser) => {
          if (Object.keys(updatedUser).length) {
            setUser(updatedUser);
          }
          navigate(`/levels/${levelId}`);
        });
      });
    }
  };
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
              <button
                key={level.id}
                onClick={() => createRound(level.id)}
                to={`/levels/${level.id}`}
              >
                Level {level.id}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Homepage;
