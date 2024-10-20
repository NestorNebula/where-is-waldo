import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../context/GameContext';
import { promiseFetch } from '../../../helpers/fetch';
import icon from '../../../assets/icons/icon.png';
import styles from './Homepage.module.css';

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
      <header className={styles.header}>
        <div>Welcome to Where is Waldo?</div>
        <img src={icon}></img>
      </header>
      <section className={styles.section}>
        <div>Try to find Waldo and his friends in the levels below!</div>
        <div className={styles.levels}>
          {levels.map((level) => {
            return (
              <button
                key={level.id}
                onClick={() => createRound(level.id)}
                to={`/levels/${level.id}`}
                className={styles.levelBtn}
              >
                <div>Level {level.id}</div>
                <img src={`../src/assets/images/${level.title}`} alt="" />
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Homepage;
